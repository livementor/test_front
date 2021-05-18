<template>
  <div>
    <span>Conversations ids</span>
    <div v-for="(id, index) in conversationsIds" :key="index">
      <NuxtLink :to="`/chat/conversations/${id}`" class="text-blue-livementor">
        {{ id }}
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, namespace, Vue } from 'nuxt-property-decorator'

const conversationsModule = namespace('conversations')

@Component
export default class ConversationList extends Vue {
  @conversationsModule.Getter('getConversations') getConversations:any

  get conversationsIds () {
    if (!this.$fire.auth.currentUser) {
      return []
    }
    return Object.keys(this.getConversations)
  }
}
</script>
