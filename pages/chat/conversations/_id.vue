<template>
  <div>
    <div>
      <span>{{ currentConversation }}</span>
    </div>
    <span>
      Conversation sélectionnée {{ $route.params.id }}
    </span>
    <div v-for="(id, index) in messagesForCurrentConversation" :key="index">
      {{ id }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Message } from '~/models/message'
import { Conversation } from '~/models/conversation'

@Component
export default class Conversations extends Vue {
  conversationId: string | undefined

  @Watch('$route', {
    immediate: true,
    deep: true,
  })
  onPropertyChanged (value: any) {
    const convId = value?.params?.id
    if (convId && typeof convId === 'string') {
      this.conversationId = convId
      this.$store.dispatch('messages/fetchMessagesForConversation', convId)
    }
  }

  get currentConversation (): Conversation | null {
    if (!this.conversationId) {
      return null
    }
    return this.$store.getters['conversations/getConversationById'](this.conversationId)
  }

  get messagesForCurrentConversation (): Message[] {
    if (!this.conversationId) {
      return []
    }
    return this.$store.getters['messages/getMessagesForConversation'](this.conversationId)
  }
}
</script>
