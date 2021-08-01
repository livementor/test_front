<template>
  <div class="conversations-id">
    <div v-if="hasMessages">
      <!-- {{ messages }} -->
      <template v-for="(message, index) in messages">
        <Message-item
          :key="`mssg-${index}`"
          :message="message"
        />
      </template>
    </div>
    <div v-else>
      Pas de messages
    </div>
  </div>
</template>

<script lang="ts">
import MessageItem from '@/components/chat/Message.vue'
import { Getter } from 'vuex-class'
import { Component, Vue, Watch } from 'vue-property-decorator'

@Component({
  components: {
    MessageItem,
  },
})
export default class Conversations extends Vue {
  currentroot = 'no route'
  conversationData: any
  messages = []
  @Getter('messages/getMessagesForConversation') getMessagesForConversation:any
  @Getter('conversations/getConversationsById') getConversationsById:any
  @Watch('$route', { immediate: true })
  async onPropertyChanged () {
    this.currentroot = this.$route.params.id
    this.conversationData = await this.getConversationsById(this.currentroot)
    await this.getMessages()
    await this.$store.dispatch('users/fetchUsers', this.conversationData?.participants)
  }

  async getMessages () {
    await this.$store.dispatch('messages/fetchMessagesForConversation', this.currentroot)
    this.messages = this.getMessagesForConversation(this.currentroot)
  }

  get hasMessages () {
    return this.messages?.length > 0
  }
}
</script>

<style>
.conversations-id {
  background-color: #252526;
}
</style>
