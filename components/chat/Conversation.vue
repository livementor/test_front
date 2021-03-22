<template>
  <div class="flex h-full" style="flex-direction: column;">
    <header class="space-y-0.5 text-center border-b-2" style="flex-grow: 0;">
      <p class="text-lg text-black font-semibold">
        {{ title }}
      </p>
      <p class="text-sm text-black font-medium">
        <template v-for="(userName, index) in participants">
          <template v-if="index > 0">
            {{ `, ` }}
          </template>
          {{ userName }}
        </template>
      </p>
    </header>
    <div ref="message-list" class="overflow-y-scroll" style="flex-grow: 1;">
      <template v-for="(message, index) in messages">
        <div :key="index"
             class="w-3/4 sm:py-2 sm:px-2 sm:my-2 sm:mx-2 rounded"
             :class="{
               'float-right': message.author === authUser,
               'float-left' : message.author !== authUser,
               'bg-blue-700': message.author === authUser,
               'bg-blue-200' : message.author !== authUser,
             }"
        >
          <p>
            {{ message.text }}
          </p>
          <p class="text-sm text-grey-500 font-small">
            {{ new Date(message.createdAt).toUTCString() }}
          </p>
        </div>
      </template>
    </div>
    <footer class="text-center border-t-2 px-3 py-3 flex space-x-3" style="flex-grow: 0;">
      <textarea v-model="message" type="text" class="rounded border" style="flex-grow: 1;" />
      <button class="p-3 border-blue-800 text-blue-800 hover:text-white rounded border-2 hover:bg-blue-700" @click="sendMessage">
        Envoyer
      </button>
    </footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Getter, State, Action } from 'vuex-class'
// overflow-y-scroll
const ConversationProps = Vue.extend({
  props: {
    conversationId: {
      type: String,
      default: null,
    },
  },
})

@Component
export default class Conversation extends ConversationProps {
  @Getter('conversations/getConversationById') getConversationById:any
  @Getter('messages/getMessagesForConversation') getMessagesForConversation:any
  @Getter('users/getUserById') getUserById:any
  @State(state => state.users.authUser) authUser: any
  @Action('messages/createMessage') createMessage: any

  private message: string = ''

  mounted () {
    if (this.conversationId) {
      this.$store.dispatch('messages/fetchMessagesForConversation', this.conversationId)
    }
  }

  get title () {
    if (!this.conversationId) {
      return ''
    }
    const conv = this.getConversationById(this.conversationId)
    return conv ? conv.title : ''
  }

  get participants () {
    if (!this.conversationId) {
      return []
    }
    const conv = this.getConversationById(this.conversationId)
    if (!conv) {
      return []
    }
    return conv.participants.map((p: string) => {
      const user = this.getUserById(p)
      return user ? user.name : p
    })
  }

  get messages () {
    const messages = this.getMessagesForConversation(this.conversationId)
    return messages || []
  }

  @Watch('messages')
  onMessagesChanged () {
    Vue.nextTick(() => {
      const el = this.$refs['message-list']
      if (el && el instanceof Element) {
        el.scrollTo({
          top: el.scrollHeight,
          left: 0,
          behavior: 'smooth',
        })
      }
    })
  }

  sendMessage () {
    if (this.message && this.message.length > 0) {
      this.createMessage({
        message: {
          author: this.authUser,
          text: this.message,
        },
        conversationId: this.conversationId,
      })
      this.message = ''
    }
  }
}
</script>

<style>
</style>
