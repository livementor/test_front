<template>
  <div class="conversation-container">
    <span>{{ $route.params.id }}</span>
    <div class="flex flex-col">
      <Message v-for="(message, index) in messages" :key="index" :message="message" />
    </div>
    <div class="input-container">
      <input v-model="newMessage" type="text">
      <Button :text="$t('chat.sendMessage')" :disabled="!newMessage" @click.native="sendMessage" />
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

@Component
export default class Conversations extends Vue {
  @Getter('messages/getMessagesForConversation')
  getMessagesForConversation: any;

  newMessage = '';
  @Watch('$route')
  get messages () {
    return this.getMessagesForConversation(this.$route.params.id)
  }

  mounted () {
    this.$store.dispatch(
      'messages/fetchMessagesForConversation',
      this.$route.params.id,
    )
  }

  sendMessage () {
    this.$store.dispatch('messages/createMessage', {
      conversationId: this.$route.params.id,
      message: { text: this.newMessage },
    })

    // This is just to make the app work, for production it would be better to correct the bug
    this.$store.dispatch(
      'messages/fetchMessagesForConversation',
      this.$route.params.id,
    )
    this.newMessage = ''
  }
}
</script>
<style scoped>
.conversation-container div {
  padding: 1rem;
}
.input-container {
  width: 100%;
  display: flex;
  padding: 10px;
}
.input-container input {
  width: 100%;
  margin-right: 20px;
}
.conversation-container {
  overflow: scroll;
}
</style>
