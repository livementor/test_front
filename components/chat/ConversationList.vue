<template>
  <div class="conversation-list p-4">
    <NuxtLink v-for="({ id }, i) in conversations" :key="i" :to="`/chat/conversations/${id}`" class="conversation-list__room">
      <div class="p-4">
        <p class="maz-dots-text text-center">
          {{ getParticipant(id) }} - Room ID : {{ id }}
        </p>
      </div>
    </NuxtLink>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

@Component
export default class ConversationList extends Vue {
  @Getter('conversations/getConversations') getConversations:any
  @Getter('users/getAuthUser') authUser!: string

  get conversations () {
    if (!this.$fire.auth.currentUser) {
      return []
    }

    return this.getConversations
  }

  getParticipant (conversationId: string) {
    const participant: string = this.conversations[conversationId].participants.filter((p: string) => p !== this.authUser)[0]
    return participant.substring(0, 2).toUpperCase()
  }
}
</script>

<style lang="scss" scoped>
.conversation-list {
  &__room {
    > div {
      margin-bottom: 1rem;
      border-radius: 0.75rem;

      &:hover {
        transition: all 300ms ease-in-out;
        background-color: #F2F2F2;
      }
    }

    &.nuxt-link-exact-active {
      > div {
        background-color: rgba(#4fc1b5, 0.2);
      }
    }
  }
}
</style>
