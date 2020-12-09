<template>
  <div>
      <NuxtLink :to="`/chat/conversations/${conversation.id}`" class="text-blue-livementor">
        {{ conversation.title }}
      </NuxtLink>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Conversation } from '~/models/conversation'

@Component
export default class ConversationItem extends Vue {
  @Prop() conversation!: Conversation
}
</script>
