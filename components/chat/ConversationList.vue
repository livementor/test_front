<template>
  <div class="border-b-2">
    <div v-for="(conversation, index) in conversations" :key="index" class="p-2 hover:bg-gray-100">
      <NuxtLink :to="`/chat/conversations/${conversation.id}`" class="text-blue-livementor">
        <p class="text-black">
          {{ conversation.title }}
        </p>
        <p class="text-gray-600">
          {{ membersText(conversation.participants) }}
        </p>
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
    return participants.length + ' ' + this.$t('conversationList.members')
  }
}
</script>
