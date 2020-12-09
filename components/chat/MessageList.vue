<template>
  <div>
    <div v-for="(message, index) in messages" :key="index">
      <MessageItem :message="message" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import { Message } from '~/models/message'

@Component
export default class MessageList extends Vue {
  @Prop() conversationId!: string
  @Getter('messages/getMessagesForConversation') getMessagesForConversation:any

  get messages () {
    if (!this.$fire.auth.currentUser) {
      return []
    }
    this.$store.dispatch('messages/fetchMessagesForConversation', this.$route.params.id)
    return this.getMessagesForConversation(this.conversationId) as Message[]
  }
}
</script>
