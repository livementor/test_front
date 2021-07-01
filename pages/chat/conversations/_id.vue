<template>
  <div v-if="isMessagesFetched" class="Message-list p-2">
    <Message
      v-for="message in getMessagesForConversation($route.params.id)"
      :key="message.id"
      :message="message"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

@Component
export default class Conversations extends Vue {
  isMessagesFetched = false

  @Getter('messages/getMessagesForConversation') getMessagesForConversation:any

  mounted () {
    this.fetchMessages(this.$route.params.id)
  }

  async fetchMessages (conversationId: string) {
    try {
      await this.$store.dispatch(
        'messages/fetchMessagesForConversation',
        conversationId,
      )
      this.isMessagesFetched = true
    } catch (error) {
      // @todo: show a toast or an understandable error to the user
      // eslint-disable-next-line no-console
      console.error(error)
    }
  }
}
</script>
