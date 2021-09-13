<template>
  <div>
    <div v-if="conversationsMock.length <= 0">
      {{ $t('chat.noConversation') }}
    </div>

    <div v-for="(conversation, index) in conversationsMock" v-else :key="index">
      <NuxtLink :to="`/chat/conversations/${conversation.id}`" class="text-blue-livementor">
        <v-card class="mb-2">
          <v-card-title>{{ conversation.title }}</v-card-title>
          <v-card-text>
            Participants : {{ conversation.participants.join(', ') }}
          </v-card-text>
        </v-card>
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'

@Component
export default class ConversationList extends Vue {
  @Getter('conversations/getConversations') getConversations:any
  @Action('conversations/createConversation') createConversation:any

  get conversations () {
    if (!this.$fire.auth.currentUser) {
      return []
    }

    return this.getConversations
  }

  get conversationsMock () {
    return [
      {
        id: 1,
        participants: [1, 2],
        title: 'Conversation 1',
      },
      {
        id: 2,
        participants: [1, 3],
        title: 'Conversation 2',
      },
      {
        id: 3,
        participants: [3, 2],
        title: 'Conversation 3',
      },
    ]
  }
}
</script>
