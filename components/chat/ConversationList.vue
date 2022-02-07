<template>
  <div class="h-full">
    <div class="font-bold text-20 p-3">
      {{ $t('chat.messages') }}
    </div>
    <div class="relative flex-1 flex flex-col max-w-xs w-full bg-white focus:outline-none">
      <ul>
        <li
          v-for="(conversation, index) in conversations"
          :key="index"
        >
          <ConversationAttendees
            :conversation="conversation"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import { Conversation } from '~/models/conversation'

@Component
export default class ConversationList extends Vue {
  @Getter('conversations/getConversations') getConversations:any

  get conversations (): Array<Conversation> {
    if (!this.$fire.auth.currentUser) {
      return []
    }
    return this.getConversations
  }

  onDelete (id: string) {
    this.$store.dispatch('conversations/deleteConversationsForId', id)
  }
}
</script>
