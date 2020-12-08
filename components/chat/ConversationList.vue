<template>
  <div>
    <div v-for="(conversation, index) in conversations" :key="index">
      <ConversationListItem v-bind:conversation="conversation"/>
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

  get conversations () {
    if (!this.$fire.auth.currentUser) {
      return []
    }
    return this.getConversations as Conversation[];
  }
}
</script>
