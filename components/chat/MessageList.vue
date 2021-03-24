<template>
  <div ref="message-list">
    <MessageListItem
      v-for="(message, index) in messages"
      :key="index"
      :class="{
        'float-right bg-blue-700': message.author === authUserId,
        'float-left bg-blue-200' : message.author !== authUserId,
      }"
      :text="message.text"
      :date="message.createdAt"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'

@Component
export default class MessageList extends Vue {
  @Prop() conversationId!: string
  @Getter('messages/getMessagesForConversation') getMessagesForConversation: any
  @Getter('users/getAuthUserId') authUserId: any
  @Action('messages/fetchMessagesForConversation') fetchMessages: any

  mounted () {
    if (this.conversationId) {
      this.fetchMessages(this.conversationId)
    }
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
