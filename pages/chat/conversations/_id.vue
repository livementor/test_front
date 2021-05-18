<template>
  <div>
    <div v-for="{id, createdAt, text} in conversationMessages" :key="id">
      <div class="flex flex-col items-center text-gray-600 text-xs">
        {{ new Date(createdAt) | date('EEEE, MMMM do, HH:mm') | toUpperCase }}
      </div>
      <p>{{ text }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, namespace, Vue, Watch } from 'nuxt-property-decorator'
import { Message } from '~/models/message'

const messagesModule = namespace('messages')

@Component({
  filters: {
    toUpperCase (value?: string): string {
      if (!value) {
        return ''
      }
      return value.toString().toUpperCase()
    },
  },
})
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
