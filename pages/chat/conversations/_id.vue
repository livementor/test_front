<template>
  <div v-if="messages">
    <div v-for="message in messages"
         :key="message.id"
         class="bg-gray-400 border-2"
         :class="{ 'text-right' : (isMyMessage(message))}"
    >
      {{ message.text }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Action } from 'vuex-class'
import _ from 'lodash'

@Component
export default class Conversations extends Vue {
  currentroot = 'no route'
  @Action('messages/fetchMessagesForConversation')
  fetchMessagesForConversation!: (conversationId: string) => void

  @Watch('$route')
  onPropertyChanged (value: any, _: any) {
    this.currentroot = value.params.id
    this.fetchMessagesForConversation(this.currentroot)
  }

  get messages (): any[] {
    return _.orderBy(
      Object.values(this.$store.state.messages),
      ['created_at'],
      ['asc'],
    )
  }

  asyncData () {
    this.fetchMessagesForConversation(this.$route.params.id)
  }

  isMyMessage (message: any) {
    return (message.author === this.$store.state.users.authUser)
  }
}
</script>
