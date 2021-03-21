<template>
  <div class="flex h-screen">
    <div class="w-1/4">
      <ConversationList class="border h-full" />
    </div>
    <NuxtChild class="w-3/4" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'

@Component
export default class Chat extends Vue {
  @Watch('$store.state.users.authUser', { immediate: true })
  onChange (value: any) {
    if (value !== null && value !== undefined && value !== '') {
      this.$store.dispatch('conversations/fetchConversationsForCurrentUser')
      this.$store.dispatch('users/fetchUsers')
    }
  }
}
</script>
