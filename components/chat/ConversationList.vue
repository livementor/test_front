<template>
  <div>
    <span>Conversations</span>
    <div v-for="(conversation, index) in conversations" :key="index" class="conversation-container">
      <div class="avatar" />
      <NuxtLink :to="`/chat/conversations/${conversation.id}`" class="text-blue-livementor">
        {{ opponent(conversation.participants) && opponent(conversation.participants).name ? opponent(conversation.participants).name : 'Name' }}
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts">
import _ from 'lodash'
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

@Component
export default class ConversationList extends Vue {
  getOpponentId = (participants: any[]) => {
    return _.find(participants, participant => participant !== this.$store.state.authUser)
  }

  @Getter('conversations/getConversations') getConversations:any
  get conversations () {
    if (!this.$fire.auth.currentUser) {
      return []
    }
    return this.getConversations
  }

  @Getter('users/getUserById') getUserById:any
  opponent (participants: any[]) {
    const opponentId = this.getOpponentId(participants)
    return this.getUserById(opponentId)
  }

  @Watch('$store.state.conversations')
  onConversationsUpdated () {
    _.map(this.conversations, conversation => {
      _.map(conversation.participants, userId => this.$store.dispatch('users/fetchUserById', userId))
    })
  }
}
</script>

<style scoped>
  .conversation-container {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    display: flex;
  }

  .avatar {
    height: 25px;
    width: 25px;
    background-color: #bbb;
    border-radius: 50%;
    margin-right: 10px;
    text-align: center;
  }
</style>
