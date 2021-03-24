<template>
  <div v-if="conversation" class="flex h-full" style="flex-direction: column;">
    <ConversationHeader :conversation="conversation" />
    <MessageList :conversationId="conversationId" class="overflow-y-scroll" style="flex-grow: 1;" />
    <ConversationFooter :conversationId="conversationId" />
  </div>
  <div v-else>
    Chargement de la conversation.
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

@Component
export default class Conversation extends Vue {
  @Prop() conversationId!: string
  @Getter('conversations/getConversationById') getConversationById: any

  get conversation () {
    return this.getConversationById(this.conversationId)
  }
}
</script>

<style>
</style>
