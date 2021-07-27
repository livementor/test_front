<template>
  <div>
    <div v-for="(conversation, index) in conversations" :key="index">
      <NuxtLink :to="`/chat/conversations/${conversation.id}`">
        <div 
        :class="{'bg-green-200': $route.params.id === conversation.id}" 
        class="flex items-center m-2 p-3 hover:bg-green-200 rounded">
          <div>
            <avatar :user="conversation.recipient" />
          </div>
          <div v-if="conversation.recipient" class="ml-4">
            <p>{{conversation.recipient.name}}</p>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

@Component
export default class ConversationList extends Vue {
  @Getter('conversations/getConversations') getConversations:any
  @Getter('users/getUserById') getUserById:any

  get conversationsIds () {
    if (!this.$fire.auth.currentUser) {
      return []
    }
    return Object.keys(this.getConversations)
  }

  get conversations() {
    if (!this.$fire.auth.currentUser) {
      return []
    }
    return Object.keys(this.getConversations).map(key => {
      const value = this.getConversations[key];
      const recipientId = value.participants.filter((participant: any) => participant !== this.$fire.auth.currentUser?.uid)[0]
      return {id: key, ...value, recipient: this.getUserById(recipientId)}
    })
  }

  
}
</script>
