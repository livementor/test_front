<template>
  <div>
    <ConversationHeader :id="currentroot" />

    <div class="main-container">
      <ConversationMessage
        v-for="(message, index) in messages"
        :key="index"
        :message="message"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Getter, State } from 'vuex-class'
import { Message } from '~/models/message'

@Component
export default class Conversations extends Vue {
  @Getter('messages/getMessagesForConversation') getMessages: any
  @State('users') users: any
  messages: Array<Message> = []
  currentroot = 'no route'

  @Watch('$route.params.id', { immediate: true })
  onPropertyChanged (id: string) {
    this.currentroot = id
    if (id !== null && id !== undefined && id !== '') {
      this.$store.dispatch('messages/fetchMessagesForConversation', id)
        .then(() => { this.messages = this.getMessages(id) })
    }
  }
}
</script>

<style scoped>
  .main-container {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    height: 100%;
    background: #eee;
  }
</style>
