<template>
  <div class="flex">
    <div class="w-1/4 border">
      <div class="font-bold text-18 p-4">
        Messages
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
  mounted () {
    this.$store.dispatch('users/bindUsers', (this as any).$fire.firestore.collection('users'))
  }

  unmounted () {
    this.$store.dispatch('users/unbindUsers')
  }

  @Watch('$store.state.users.authUser', { immediate: true })
  onChange (value: any) {
    if (value !== null && value !== undefined && value !== '') {
      this.$store.dispatch('conversations/fetchConversationsForCurrentUser')
    }
  }
}
</script>
