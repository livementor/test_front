<template>
  <div class="flex p-2">
    <img :src="correspondent.photoURL" alt="picture" class="h-12 w-12 rounded-full">
    <span>{{ correspondent.displayName }}</span>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import { Conversation } from '~/models/conversation'

@Component
export default class ConversationTab extends Vue {
  @Prop({ required: true }) conversation!: Conversation
  @Getter('conversations/getConversations') getConversations: any
  @Getter('users/getUsers') getUsers: any

  get correspondent () {
    const currentUserId = this.$fire.auth.currentUser?.uid
    const correspondentId = this.conversation.participants
      .find(p => p !== currentUserId)
    const userDetails = this.getUsers.find((u: any) => u.id === correspondentId)
    return userDetails || {}
  }
}
</script>
