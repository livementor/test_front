<template>
  <div class="flex">
    <div class="w-1/4 h-screen shadow">
      <span class="inline-block font-bold text-16 my-4 pl-4">
        Messages
      </span>
      <ConversationList />
    </div>
    <NuxtChild class="w-3/4" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'

@Component
export default class Chat extends Vue {
  @Watch('$store.state.users.authUser', { immediate: true })
  onChange (value: any) {
    if (value !== null && value !== undefined && value !== '') {
      this.$store.dispatch('conversations/fetchConversationsForCurrentUser')
    }
  }
}
</script>
