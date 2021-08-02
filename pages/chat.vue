<template>
  <div class="flex chat">
    <div class="w-1/4 left-panel">
      <span class="font-bold text-24 mb-20">
        Messages
      </span>
      <ConversationList />
    </div>
    <NuxtChild class="w-3/4 right-panel" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import ConversationList from '~/components/chat/ConversationList.vue'
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
<style>
  .chat .left-panel {
    border-right: 2px solid grey;
    background-color: #034035;
    color: white;
    height: calc(100% - 66px);
  }

  .chat .right-panel {
    background-color: aliceblue;
  }
</style>
