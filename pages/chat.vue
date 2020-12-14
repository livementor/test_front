<template>
  <div class="flex flex-1 p-8 overflow-hidden">
    <div class="w-1/4">
      <ConversationList />
    </div>
    <NuxtChild :key="$route.params.id" class="w-3/4" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'

@Component
export default class Chat extends Vue {
  @Watch('$store.state.users.authUser', { immediate: true })
  onChange (value: any) {
    if (value) {
      this.$store.dispatch('chat/bindUserConversations')
    }
  }
}
</script>
