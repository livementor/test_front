<template>
  <div class="flex h-full" style="flex-direction: column;">
    <ConversationHeader :conversationId="conversationId" />
    <MessageList :conversationId="conversationId" class="overflow-y-scroll" style="flex-grow: 1;" />
    <ConversationFooter :conversationId="conversationId" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class Conversation extends Vue {
  @Prop() conversationId!: string
}
</script>

<style>
</style>
