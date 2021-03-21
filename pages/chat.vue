<template>
  <div class="flex h-full">
    <div class="w-1/4 border h-full overflow-y-scroll">
      <ConversationList />
    </div>
    <div class="w-3/4 h-full overflow-y-scroll">
      <NuxtChild />
    </div>
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
