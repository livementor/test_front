<template>
  <div class="flex">
    <div class="w-1/4 border-r border-solid border-gray">
      <div class="h-16 flex flex-row items-center px-6">
        <NuxtLink to="/chat/conversations/">
          <span class="font-bold text-24">
            Chat Layout
          </span>
        </NuxtLink>
      </div>
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
