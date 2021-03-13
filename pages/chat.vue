<template>
  <div class="flex">
    <div class="w-1/4">
      <ConversationList class="border" />
    </div>

    <NuxtChild class="w-3/4" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import ConversationList from '~/components/chat/ConversationList.vue'

@Component({ components: { ConversationList } })
export default class Chat extends Vue {
  @Watch('$store.state.users.authUser', { immediate: true })
  onChange(currentUserId: any) {
    if (currentUserId) {
      this.$store.dispatch('conversations/fetchConversationsForCurrentUser')
    }
  }
}
</script>
