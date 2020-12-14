<template>
  <div class="flex flex-1 p-8 overflow-hidden">
    <div class="lg:w-2/5 xl:w-2/6 overflow-auto left-scroll">
      <ConversationList class="left-scroll__content pl-4" />
    </div>
    <NuxtChild :key="$route.params.id" class="lg:w-3/5 xl:w-4/6" />
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
<style>
.left-scroll {
  direction: rtl;
}
.left-scroll__content {
  direction: ltr;
}
</style>
