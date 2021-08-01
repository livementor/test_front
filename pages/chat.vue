<template>
  <div class="chat-layout flex">
    <div class="w-1/4">
      <span class="font-bold text-24 mb-20">
        Messages
      </span>
      <ConversationList />
    </div>
    <NuxtChild class="w-3/4" />
  </div>
</template>

<script lang="ts">
import ConversationList from '@/components/chat/ConversationList.vue'
import { Component, Vue, Watch } from 'vue-property-decorator'

@Component({
  components: {
    ConversationList,
  },
})
export default class Chat extends Vue {
  @Watch('$store.state.authUser', { immediate: true })
  onChange (value: any) {
    if (value !== null && value !== undefined && value !== '') {
      this.$store.dispatch('conversations/fetchConversationsForCurrentUser')
    }
  }
}
</script>

<style lang="css">
.chat-layout {
  background-color: #1e1e1e;
  height: 100vh;
  color: #ccccff;
}
</style>
