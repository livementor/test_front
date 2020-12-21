<template>
  <div>
    <div v-for="(conversation, index) in conversations" :key="index">
      <NuxtLink :to="`/chat/conversations/${conversation.id}`" class="text-blue-livementor">
        <span>{{ conversation.title }}</span>
        <span>{{ membersText(conversation.participants) }}</span>
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

@Component
export default class ConversationList extends Vue {
  @Getter('conversations/getConversations') getConversations: any;

  get conversations () {
    if (!this.$fire.auth.currentUser) {
      return []
    }
    return this.getConversations
  }

  membersText (participants: any) {
    return participants.length + this.$t('conversationList.members')
  }
}
</script>
<style scoped>
.border {
  overflow: auto;
}
</style>
