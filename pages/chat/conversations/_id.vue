<template>
  <div class="h-full">
    <span class="font-bold text-24 mb-20">{{ conversationTitle }}</span>
    <div class="flex flex-col p-4">
      <Message v-for="(message, index) in messages" :key="index" :message="message" />
    </div>
    <div class="w-full flex flex-row p-2">
      <input v-model="newMessage" type="text" class="w-full mr-10">
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

  @Getter('conversations/getConversation') getConversation: any;

  newMessage = '';
  @Watch('$route')
  get messages () {
    return this.getMessagesForConversation(this.$route.params.id)
  }

  get conversationTitle () {
    const conversation = this.getConversation(this.$route.params.id)
    if (conversation) {
      return conversation.title
    }
    return ''
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
