<template>
  <div class="chat maz-flex maz-flex-1">
    <div class="chat__sidebar maz-flex maz-direction-column w-1/4">
      <div class="chat__sidebar__header maz-flex-fixed p-4">
        <p class="font-bold text-center">
          {{ $t('chat.header_title') }} ({{ conversationsCount }})
        </p>
      </div>
      <div class="chat__sidebar__list maz-flex-1">
        <ConversationList />
      </div>
      <div class="chat__sidebar__footer maz-flex-fixed p-4">
        <Button :block="true" @click="createConversation()">
          {{ $t('chat.create_conversation') }}
        </Button>
      </div>
    </div>
    <NuxtChild class="w-3/4" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'

@Component
export default class Chat extends Vue {
  @Action('conversations/fetchConversationsForCurrentUser') fetchConversationsForCurrentUser!:() => void
  @Action('conversations/createConversation') createConversation!:() => void
  @Getter('conversations/getConversations') getConversations:any

  @Watch('$store.state.users.authUser', { immediate: true })
  onChange (value: any) {
    if (value !== null && value !== undefined && value !== '') {
      this.fetchConversationsForCurrentUser()
    }
  }

  get conversationsCount () {
    if (!this.$fire.auth.currentUser) {
      return []
    }
    return Object.keys(this.getConversations).length
  }
}
</script>

<style lang="scss" scoped>
.chat {
  min-height: 0;

  &__sidebar {
    border-right: 0.125rem solid #F2F2F2;

    &__header {
      border-bottom: 0.125rem solid #F2F2F2;
      font-size: 1.2rem;
    }

    &__footer {
      border-top: 0.125rem solid #F2F2F2;
    }

    &__list {
      overflow-y: auto;
    }
  }
}
</style>
