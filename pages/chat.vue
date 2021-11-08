<template>
  <div class="flex chat_container">
    <div class="col-5 col-md-3 col-lg-3 border-end">
      <p class="font-bold p-3 fs-3">
        Messages
      </p>
      <ConversationList />
    </div>
    <NuxtChild class="col-7 col-md-9 col-lg-9" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'

@Component
export default class Chat extends Vue {
  @Watch('$store.state.authUser', { immediate: true })
  onChange (value: any) {
    if (value !== null && value !== undefined && value !== '') {
      this.$store.dispatch('conversations/fetchConversationsForCurrentUser')
    }
  }
}
</script>

<style scoped >
  .chat_container {
    height: calc(100vh - 64px);
  }
</style>
