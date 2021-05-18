<template>
  <div>
    <div v-for="{id, createdAt, text} in conversationMessages" :key="id">
      <span>{{ new Date(createdAt) | date('EEEE, MMMM do, HH:mm') }}</span>
      <p>{{ text }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, namespace, Vue, Watch } from 'nuxt-property-decorator'
import { Message } from '~/models/message'

const messagesModule = namespace('messages')

@Component
export default class Conversations extends Vue {
  @messagesModule.Action('fetchMessagesForConversation') fetchMessagesForConversation: any
  @messagesModule.Getter('getMessagesForConversation') getMessagesForConversation!: (conversationId: string) => Message[]

  conversationMessages?: Message[] = []

  @Watch('$route', { immediate: true })
  async onPropertyChanged (value: any, _: any) {
    await this.fetchMessagesForConversation(value.params.id)

    this.conversationMessages = this.getMessagesForConversation(value.params.id)
  }
}
</script>
