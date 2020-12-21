<template>
  <div class="flex">
    <div class="w-1/4">
      <span class="font-bold text-24 mb-20">{{ $t('chat.listTitle') }}</span>
      <input v-model="convTitle" type="text">
      <Button :text="$t('chat.newConversation')" :disabled="!convTitle" @click.native="newConv" />
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
