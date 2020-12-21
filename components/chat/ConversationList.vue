<template>
  <div>
    <div v-if="conversations">
      <div v-for="conversation in conversations" :key="conversation.id">
        <div class="bg-gray-400 border-2">
          <NuxtLink :to="`/chat/conversations/${conversation.id}`" class="text-blue-livementor">
            {{ conversation.title }}
          </NuxtLink>
        </div>
      </div>
    </div>
    <div v-else>
      {{ $t('chat.noExistingConversations') }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'

@Component
export default class ConversationList extends Vue {
  @Getter('conversations/getConversations') getConversations:any

  get conversations () {
    if (!this.$fire.auth.currentUser) {
      return []
    }

    return this.getConversations
  }

@Action('conversations/fetchConversationsForCurrentUser')
  fetchConversationsForCurrentUser!: () => void
}
</script>
