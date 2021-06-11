<template>
  <div class="flex">
    <div class="w-1/4 p-6">
      <span class="font-bold text-24 mb-20">
        {{ $t('chat.messages') }}
      </span>
      <ConversationList class="border" />
    </div>
    <NuxtChild class="w-3/4 p-6" />
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
