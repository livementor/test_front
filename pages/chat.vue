<template>
  <div class="flex h-screen">
    <div class="w-1/4">
      <span class="font-bold text-24 mb-20">{{ $t('chat.listTitle') }}</span>
      <div class="w-full flex flex-row p-2">
        <input v-model="convTitle" class="w-full mr-10" type="text">
        <Button :text="$t('chat.newConversation')" :disabled="!convTitle" @click.native="newConv" />
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
  convTitle = '';
  @Watch('$store.state.users.authUser', { immediate: true })
  onChange (value: any) {
    if (value !== null && value !== undefined && value !== '') {
      this.$store.dispatch('conversations/fetchConversationsForCurrentUser')
    }
  }

  newConv () {
    this.$store.dispatch('conversations/createConversation', { title: this.convTitle })

    this.$store.dispatch('conversations/fetchConversationsForCurrentUser')

    this.convTitle = ''
  }
}
</script>
