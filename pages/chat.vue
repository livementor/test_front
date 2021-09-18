<template>
  <div class="flex">
    <div class="w-1/4">
      <div class="flex items-center mb-10">
        <div>
          <span class="font-bold text-24">
            Messages
          </span>
        </div>
        <div class="ml-5">
          <ConversationGenerate />
        </div>
      </div>
      <ConversationList class="border" />
    </div>
    <NuxtChild class="w-3/4" />
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
