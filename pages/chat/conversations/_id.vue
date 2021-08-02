<template>
  <div>
    <div v-if="messagesToShow">
      <Message v-for="(msg, index) in messages" :key="index" :msg="msg" />
    </div>
    <div v-else class="no-message">
      <img src="~/assets/no-chat-message.png"></img>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import Message from '~/components/chat/Message.vue'

@Component({
  components: {
    Message,
  },
})
export default class Conversations extends Vue {
  currentRoot = undefined
  conversationData: any
  messages = []
  @Watch('$route')
  onPropertyChanged (value: any, _: any) {
    this.currentRoot = value.params.id
    if (this.currentRoot !== undefined) {
      this.conversationData = this.getConversations[this.currentRoot]
      this.$store.dispatch('messages/fetchMessagesForConversation', this.currentRoot)
      this.messages = this.getMessagesForConversation(this.currentRoot)
    }
  }

  @Getter('messages/getMessagesForConversation') getMessagesForConversation:any
  @Getter('conversations/getConversations') getConversations:any

  get messagesToShow () {
    return this.messages?.length > 0
  }
}
</script>

<style>
  .no-message {
    width: 50%;
    margin: auto;
  }
</style>
