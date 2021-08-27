<template>
  <div class="flex items-center p-3 hover:bg-blue-100 hover:text-blue-50">
    <img
      class="w-10 h-10 rounded-full mr-4"
      src="https://picsum.photos/100"
      alt="Avatar of Writer"
    >
    <NuxtLink
      :to="`/chat/conversations/${id}`"
      class="text-blue-livementor"
    >
      <div class="text-sm">
        <p class="text-gray-900 leading-none">
          {{ title }}
        </p>
        <p class="text-gray-600">
          Aug 18
        </p>
      </div>
    </NuxtLink>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Conversation } from '~/models/conversation'

@Component
export default class ConversationItem extends Vue {
  @Prop() readonly conversation: Conversation | undefined

  get id (): string {
    if (
      this.conversation &&
      this.conversation.id !== null &&
      this.conversation.id !== undefined
    ) { return this.conversation.id }

    return ''
  }

  get title (): string {
    if (
      this.conversation &&
      this.conversation.title !== null &&
      this.conversation.title !== undefined &&
      this.conversation.title !== ''
    ) { return this.conversation.title }

    return this.$t('chat.undefinedTitle') + ''
  }
}
</script>

<style scoped>

</style>
