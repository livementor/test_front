<template>
  <div>
    <div class="font-bold text-20 p-3">
      Messages
    </div>
    <div class="bg-white">
      <ul>
        <li
          v-for="(conversation, index) in conversations"
          :key="index"
        >
          <ConversationItem
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
  @Getter('conversations/getConversations') getConversations: any

  get conversations (): Array<Conversation> {
    if (!this.$fire.auth.currentUser) {
      return []
    }
    return this.getConversations
  }
}
</script>
