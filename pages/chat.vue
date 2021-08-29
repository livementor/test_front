<template>
  <div>
    <span class="font-bold text-24 mb-20">
      Chat Layout for user
    </span>
    <span class="font-bold text-14 mb-20">
      {{ $store.state.authUser }}
    </span>
    <div class="flex">
      <div class="w-1/4">
        <ConversationList class="border" />
      </div>
      <NuxtChild class="w-2/4" />
    </div>
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
