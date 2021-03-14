<template>
  <div class="flex">
    <div class="w-1/4">
      <ConversationList class="border" :conversations="conversations" />
    </div>

    <NuxtChild class="w-3/4" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'
import { Getter } from 'vuex-class'
import ConversationList from '~/components/chat/ConversationList.vue'
import { ObjectId } from '~/domain/Identifiable'
import { Conversation } from '~/domain/models/Conversation'

@Component({ components: { ConversationList } })
export default class Chat extends Vue {
  @Getter('conversations/conversations') conversations!: Record<string, Conversation>

  @Watch('$store.state.users.userId', { immediate: true })
  async onUserUpdate(updatedUserId: ObjectId) {
    await this.$store.dispatch('conversations/fetchConversationsForCurrentUser', updatedUserId)
  }
}
</script>
