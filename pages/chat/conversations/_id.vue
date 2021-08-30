<template>
  <div>
    <span>
      <!-- Conversation séléctionné {{ $route.params.id }} -->
    </span>
    <div v-if="currentroute !== 'no route'">
      <div v-for="(message, index) in conversationsMessages(currentroute)" :key="index" class="message-container">
        <p class="author">
          {{ opponent(message.author) && opponent(message.author).name ? opponent(message.author).name : 'You' }}
        </p>
        <p>{{ message.text }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

@Component
export default class Conversations extends Vue {
  currentroute = 'no route'

  fetchMessages () {
    this.currentroute = this.$route.params.id
    this.$store.dispatch('messages/fetchMessagesForConversation', this.currentroute)
  }

  mounted () {
    this.fetchMessages()
  }

  @Watch('$route')
  onPropertyChanged () {
    this.currentroute = this.$route.params.id
  }

  @Getter('users/getUserById') getUserById:any
  opponent (opponentId: string) {
    return this.getUserById(opponentId)
  }

  @Getter('messages/getMessagesForConversation') getMessagesForConversation:any
  @Watch('$store.state.messages', { immediate: true })
  conversationsMessages (conversationID: string) {
    return this.getMessagesForConversation(conversationID)
  }
}
</script>

<style scoped>
  .message-container {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    display: flex;
    flex-direction: column;
  }

  .author {
    color:darkgrey;
  }
</style>
