<template>
  <div>
    <span>Vos conversations</span>
    <ul>
      <li v-for="conversation in conversations" :key="conversation.id">
        <NuxtLink :to="`/chat/conversations/${conversation.id}`" class="text-blue-livementor">
          {{ conversation.title }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { Conversation } from '~/domain/models/Conversation'

@Component
export default class ConversationList extends Vue {
  @Prop({ type: Object, default: () => [] }) conversations!: Record<string, Conversation>
}
</script>
