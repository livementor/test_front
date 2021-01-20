<template>
  <div class="conversations-id maz-flex maz-direction-column">
    <RoomHeader />
    <div class="conversations-id__chat p-4 maz-flex-1">
      <MessageComponent
        v-for="(message, i) in messages"
        :key="i"
        :message="message"
        class="conversations-id__chat__message"
      />
    </div>
    <InputMessage :conversation-id="currentRoom" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'
import { Message } from '~/models/message'

@Component
export default class Conversations extends Vue {
  @Action('messages/fetchMessagesForConversation') fetchMessagesForConversation!: (conversationId: string) => void
  @Getter('messages/getMessagesForConversation') getMessagesForConversation!: (conversationId: string) => Array<{ id: string, createdAt: Date, author: string, text: string }>

  public messages: Message[] = []
  public currentRoom = ''

  @Watch('$route', { immediate: true })
  async onPropertyChanged (value: any, _: any) {
    this.currentRoom = value.params.id
    // const currentRoom = value.params.id as string

    await this.fetchMessagesForConversation(value.params.id)

    const roomMessage = this.getMessagesForConversation(value.params.id)

    this.messages = roomMessage.map(({ id, createdAt, text, author }) => new Message(id, createdAt, author, text))
  }
}
</script>

<style lang="scss" scoped>
.conversations-id {
  &__chat {
    min-height: 0;
    overflow-y: auto;

    &__message {
      &:not(:last-child) {
        margin-bottom: 1rem;
      }
    }
  }
}
</style>
