<template>
  <div class="flex">
    <div class="w-1/4">
      <span class="font-bold text-24 mb-20">
        {{ $t('chat.title') }}
      </span>
      <ConversationList class="border" />
      <Button :text="$t('chat.createNew')" class="w-full mt-2" @click.native="handleNewConversation" />
    </div>
    <NuxtChild class="w-3/4" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Action } from 'vuex-class'

@Component
export default class Chat extends Vue {
  newConversationTitle: string = 'New Conversation'

  @Watch('$store.state.users.authUser', { immediate: true })
  onChange (value: any) {
    if (value !== null && value !== undefined && value !== '') {
      this.$store.dispatch('conversations/fetchConversationsForCurrentUser')
    }
  }

  @Action('conversations/createConversation')
  createConversation!: (title: string) => void

  handleNewConversation () {
    this.createConversation(this.newConversationTitle)
    this.fetchConversationsForCurrentUser()
  }

  @Action('conversations/fetchConversationsForCurrentUser')
  fetchConversationsForCurrentUser!: () => void
}
</script>
