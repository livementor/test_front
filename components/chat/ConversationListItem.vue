<template>
  <div v-if="conversationRecipient" class="ConversationList-item">
    <NuxtLink :to="`/chat/conversations/${conversation.id}`" class="text-blue-livementor">
      <b-list-group-item class="d-flex align-items-center w-100">
        <b-avatar :src="conversationRecipient.avatar" class="mr-4" />
        <span class="mr-auto">{{ conversationRecipient.username }}</span>
        <b-badge v-if="conversation.unreadFor" variant="secondary" pill>
          {{ conversation.unreadFor }}
        </b-badge>
      </b-list-group-item>
    </NuxtLink>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

@Component
export default class ConversationList extends Vue {
  @Prop({ required: true }) readonly conversation: any

  @Getter('users/getUserById') getUserById:any

  get conversationRecipient () {
    if (!this.$fire.auth.currentUser) {
      return null
    }

    const conversationRecipientId = this.conversation.participants.find((el: string) => {
      return this.$fire.auth.currentUser
        ? el !== this.$fire.auth.currentUser.uid
        : false
    })

    return this.getUserById(conversationRecipientId)
  }
}
</script>
