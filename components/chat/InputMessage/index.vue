<template>
  <form
    class="input-message p-4 maz-flex"
    @submit.prevent="sendMessage"
  >
    <textarea id="message" v-model="text" name="message" class="maz-flex-1" />
    <Button class="ml-4" type="submit">
      {{ $t('chat.send_message') }}
    </Button>
  </form>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'

interface Message {
  conversationId: string
  message: {
    author: string
    text: string
  }
}

@Component
export default class MessageComponent extends Vue {
  @Prop({ required: true }) conversationId!: string
  @Getter('users/getAuthUser') authUser!: string
  @Action('messages/createMessage') createMessage!: (payload: Message) => void

  text: string = ''

  async sendMessage () {
    const { conversationId, authUser, text } = this
    await this.createMessage({ conversationId, message: { text, author: authUser } })
    this.text = ''
  }
}
</script>

<style lang="scss" scoped>
.input-message {
  border-top: 0.125rem solid #F2F2F2;
  height: 76px;

  textarea {
    background-color: rgba(0, 0, 0, 0.05);
    border-radius: 0.75rem;
    padding: 4px 8px;
    resize: none;
  }
}
</style>
