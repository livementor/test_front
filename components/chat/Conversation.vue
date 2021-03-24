<template>
  <div v-if="conversation" class="flex h-full" style="flex-direction: column;">
    <ConversationHeader :conversation="conversation" />
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
    <ConversationFooter :conversationId="conversationId" />
  </div>
  <div v-else>
    Chargement de la conversation.
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { Getter, State } from 'vuex-class'

@Component
export default class Conversation extends Vue {
  @Prop() conversationId!: string
  @Getter('conversations/getConversationById') getConversationById: any
  @Getter('messages/getMessagesForConversation') getMessagesForConversation: any
  @Getter('users/getUserById') getUserById: any
  @State(state => state.users.authUser) authUser: any

  mounted () {
    if (this.conversationId) {
      this.$store.dispatch('messages/fetchMessagesForConversation', this.conversationId)
    }
  }

  get conversation () {
    return this.getConversationById(this.conversationId)
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
}
</script>

<style>
</style>
