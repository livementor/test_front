<template>
  <div class="flex">
    <div class="w-1/4 border-r" style="height: calc(100vh - 64px);">
      <ConversationList />
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
    }
  }
}
</script>
