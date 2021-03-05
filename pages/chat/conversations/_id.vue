<template>
  <div class="bg-gray-100">
    <div class="flex p-2 border">
      <img :src="correspondent.photoURL" alt="picture" class="h-10 w-10 rounded-full">
      <div class="flex flex-col">
        <span>Nom</span>
        <span>{{ correspondent.displayName }}</span>
      </div>
    </div>
    <div v-for="(message, index) in messagesForCurrentConversation" :key="index">
      <MessageCard :message="message" class="m-8" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import { Message } from '~/models/message'
import MessageCard from '~/components/chat/MessageCard.vue'

@Component({
  components: { MessageCard },
})
export default class Conversations extends Vue {
  conversationId: string | undefined
  @Getter('conversations/getConversations') getConversations: any
  @Getter('users/getUsers') getUsers: any

  @Watch('$route', {
    immediate: true,
    deep: true,
  })
  onPropertyChanged (value: any) {
    const convId = value?.params?.id
    if (convId && typeof convId === 'string') {
      this.conversationId = convId
      this.$store.dispatch('messages/fetchMessagesForConversation', convId)
    }
  }

  get messagesForCurrentConversation (): Message[] {
    if (!this.conversationId) {
      return []
    }
    return this.$store.getters['messages/getMessagesForConversation'](this.conversationId)
  }

  get correspondent () {
    let userDetails
    if (this.conversationId) {
      const currentUserId = this.$fire.auth.currentUser?.uid
      const conversation = this.getConversations[this.conversationId]
      const correspondentId = conversation.participants
        .find((p: any) => p !== currentUserId)
      userDetails = this.getUsers.find((u: any) => u.id === correspondentId)
    }
    return userDetails || {}
  }
}
</script>
