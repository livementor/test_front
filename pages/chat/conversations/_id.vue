<template>
  <div>
    <span v-if="messages">
      <div v-for="message in messages" :key="message.id">
        {{ message.text }}
      </div>
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'

@Component
export default class Conversations extends Vue {
  @Watch('$route')
  async onPropertyChanged () {
    await this.fetchMessages()
  }

  async mounted () {
    await this.fetchMessages()
  }

  async fetchMessages () {
    await this.$store.dispatch('messages/fetchMessagesForConversation', this.conversationId)
  }

  get conversationId () {
    return this.$route.params.id
  }

  get messages () {
    return this.$store.getters['messages/getMessagesForConversation'](this.conversationId)
  }
}
</script>
