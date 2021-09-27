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

    <div class="message-input w-3/4">
      <textarea v-model="draft" class="w-3/4" :disabled="sending" />
      <div class="w-1/4 message-controls">
        <Button text="Send" :disabled="sending || !draft" @click.native="sendMessage" />
      </div>
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
  draft = '';
  sending = false;

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

  async sendMessage () {
    this.sending = true
    await this.$store.dispatch('messages/createMessage', {
      conversationId: this.conversationId, message: { author: this.$fire.auth.currentUser?.uid, text: this.draft },
    })
    await this.refreshMessages()
    this.draft = ''
    this.sending = false
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

.message-input {
  position: absolute;
  bottom: 0;
  display: flex;
}
.message-input textarea {
  border-radius: .375em;
  color: #363636;
  padding: 0.5rem;
  margin-bottom: 1rem;
  box-shadow: inset 0 0.0625em 0.125em rgba(10, 10, 10, 0.05);
  border: 1px solid #dbdbdb;
}
.message-input .message-controls  {
  margin-top: 1rem;
  text-align: center;
}

</style>
