<template>
  <div class="p-4 bg-gray-100">
    <div v-for="([createdAt, messages]) in Object.entries(conversationMessages)" :key="createdAt">
      <div class="flex flex-col items-center text-gray-600 text-xs">
        {{ new Date(messages[0].createdAt) | date('EEEE, MMMM do, HH:mm') | toUpperCase }}
      </div>

      <div class="flex" :class="{ 'justify-end': isCurrentUser(messages[0].author) }">
        <img
          v-if="!isCurrentUser(messages[0].author)"
          class="participant-img rounded-full mr-4"
          src="https://picsum.photos/48/48"
          alt="participant picture"
        >

        <p class="p-3 my-2 inline-block shadow rounded-sm bg-white">
          <span
            v-for="{ id, text, author } in messages"
            :key="id"
            class="block"
            :class="{ 'my-message': isCurrentUser(author) }"
          >
            {{ text }}
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, namespace, Vue, Watch } from 'nuxt-property-decorator'
import { Message } from '~/models/message'

const messagesModule = namespace('messages')
const usersModule = namespace('users')

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
  @usersModule.State('authUser') authUser: string

  conversationMessages?: Record<string, Message[]> = {}

  @Watch('$route', { immediate: true })
  async onPropertyChanged (value: any, _: any) {
    await this.fetchMessagesForConversation(value.params.id)

    this.conversationMessages = this.buildMessagesRecord(this.getMessagesForConversation(value.params.id))
  }

  isCurrentUser (userId: string): boolean {
    return userId === this.authUser
  }

  private buildMessagesRecord (messages: Message[]) {
    if (!messages) {
      return {}
    }
    return messages.reduce((acc, message) => {
      const createdAtWithoutSeconds = Math.floor(message.createdAt / 1000000) * 10000000
      const recordKey = `${createdAtWithoutSeconds}-${message.author}`
      return {
        ...acc,
        [recordKey]: [...(acc[recordKey] || []), message],
      }
    }, {})
  }
}
</script>

<style scoped>
.participant-img {
  height: 32px;
  width: 32px;
  border-radius: 50%;
}
</style>
