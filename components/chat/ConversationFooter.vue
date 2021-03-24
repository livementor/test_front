<template>
  <footer class="text-center border-t-2 p-3 flex space-x-3">
    <textarea v-model="message" type="text" class="rounded border" style="flex-grow: 1;" />
    <ButtonLight text="Envoyer" @click="sendMessage" />
  </footer>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'

@Component
export default class ConversationFooter extends Vue {
  @Prop() conversationId!: string
  @Getter('users/getAuthUserId') authUserId: any
  @Action('messages/createMessage') createMessage: any

  private message: string = ''

  sendMessage () {
    if (this.conversationId && this.message && this.message.length > 0) {
      this.createMessage({
        message: {
          author: this.authUserId,
          text: this.message,
        },
        conversationId: this.conversationId,
      })
      this.message = ''
    }
  }
}
</script>

<style>
</style>
