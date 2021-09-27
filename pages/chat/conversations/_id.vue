<template>
  <div>
    <span>
      Conversation séléctionnée: {{ conversationId }}
    </span>

    <div v-for="message in messages" :key="message.id" class="message">
      <div class="message-date">
        {{ message.prettyDate }}
      </div>
      <p>{{ message.text }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import { Message } from '~/models/message'

@Component
export default class Conversations extends Vue {
  messages = [] as Message[]

  @Getter('messages/getMessagesForConversation') getMessages: any

  @Watch('conversationId', { immediate: true })
  onPropertyChanged (newValue: any, oldValue: any) {
    if (newValue !== oldValue) {
      this.refreshMessages()
    }
  }

  get conversationId () {
    return this.$route.params.id
  }

  async refreshMessages () {
    await this.$store.dispatch('messages/fetchMessagesForConversation', this.conversationId)

    this.messages = this.getMessages(this.conversationId)?.map((message: Message) => {
      const prettyDate = new Date(message.createdAt).toLocaleString()
      return { ...message, prettyDate }
    })
  }
}
</script>

<style scoped>
.message {
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.02);
  color: #4a4a4a;
  display: block;
  padding: 1rem;
  margin: 1rem;

}

.message .message-date {
  font-size: 0.8rem;
}

</style>
