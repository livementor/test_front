<template>
  <div class="container mx-auto">
    <div class="py-6 h-screen">
      <div class="flex border border-grey rounded shadow-lg h-full">
        <div class="w-1/3 flex flex-col">
          <ConversationSearch />
          <ConversationList />
        </div>
        <NuxtChild />
      </div>
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
