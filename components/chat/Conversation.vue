<template>
  <div class="overflow-y-auto h-full">
    <header class="space-y-0.5 text-center border-b-2">
      <p class="text-lg text-black font-semibold">
        {{ title }}
      </p>
      <p class="text-sm text-black font-medium">
        <template v-for="(userName, index) in participants">
          <template v-if="index > 0"> - </template>
          {{ userName }}
        </template>
      </p>
    </header>
    <div class="h-full">
      <template v-for="(message, index) in messages">
        <div class="w-3/4 sm:py-2 sm:px-2 sm:my-2 sm:mx-2 rounded"
          :class="{
            'float-right': message.author === authUser,
            'float-left' : message.author !== authUser,
            'bg-blue-700': message.author === authUser,
            'bg-blue-200' : message.author !== authUser,
          }">
          <p>
            {{ message.text }}
          </p>
          <p class="text-sm text-grey-500 font-small">
            {{ new Date(message.createdAt).toUTCString() }}
          </p>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Getter, State } from 'vuex-class'
import { User } from '@/models/user'

const ConversationProps = Vue.extend({
  props: {
    conversationId: String
  }
})

@Component
export default class Conversation extends ConversationProps {
  @Getter('conversations/getConversationById') getConversationById:any
  @Getter('messages/getMessagesForConversation') getMessagesForConversation:any
  @Getter('users/getUserById') getUserById:any
  @State(state => state.users.authUser) authUser: any

  mounted() {
    if(this.conversationId)
      this.$store.dispatch('messages/fetchMessagesForConversation', this.conversationId)
  }

  get title() {
    if(!this.conversationId)
      return ""
    const conv = this.getConversationById(this.conversationId)
    return conv ? conv.title : ""
  }

  get participants() {
    if(!this.conversationId)
      return []
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
}
</script>

<style>
</style>
