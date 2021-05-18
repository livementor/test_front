<template>
  <div class="container w-full">
    <NuxtLink v-for="{id, participants} in conversations" :key="id" :to="`/chat/conversations/${id}`" class="conversation">
      <img class=" participant-img rounded-full mr-4" src="https://picsum.photos/48/48" alt="participant picture">
      <span class="participant-name">{{ getOtherParticipant(participants) }}</span>
    </NuxtLink>
  </div>
</template>

<script lang="ts">
import { Component, namespace, Vue } from 'nuxt-property-decorator'
import { Conversation } from '~/models/conversation'

const conversationsModule = namespace('conversations')
const usersModule = namespace('users')

@Component
export default class ConversationList extends Vue {
  @conversationsModule.Getter('getConversations') conversations?: Conversation[]
  @usersModule.State('authUser') authUser?: string

  getOtherParticipant (participants: [string, string]): string | undefined {
    return participants.find(p => p !== this.authUser)
  }
}
</script>

<style scoped>
.container {
  --conversation-padding: 0.5rem;
  --participant-img-size: 48px;

}

.conversation {
  @apply ml-2 h-16 inline-block flex overflow-hidden;
  width: calc(100% - var(--conversation-padding) * 2);

  padding: var(--conversation-padding);

}

a.nuxt-link-exact-active {
  background-color: #e7f5f4;
}

.participant-img {
  height: var(--participant-img-size);
  width: var(--participant-img-size);
  border-radius: 50%;
}

.participant-name {
  max-width: calc(100% - 2 * var(--conversation-padding) - var(--participant-img-size));
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
