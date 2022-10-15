<template>
  <div>
    <div class="message-container" :class="{'justify-end': !isAuthUser }">
      <img
        class="w-10 h-10 rounded-full"
        :src="`https://xsgames.co/randomusers/assets/avatars/male/${message.img}.jpg`"
        alt=""
      >
      <div class="message-content">
        <p class="message">
          {{ text }}
        </p>
        <p class="text-date">
          {{ date }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Message } from '@/models/message'

@Component
export default class ConversationMessage extends Vue {
  @Prop() readonly message: Message | undefined

  get author (): string {
    return this.message ? this.message.author : ''
  }

  get isAuthUser (): boolean {
    return this.$fire.auth?.currentUser?.uid === this.author
  }

  get text (): string {
    return this.message ? this.message.text : ''
  }

  get date (): string {
    const d = this.$dayjs(this.message?.createdAt)
    return d.format('DD/MM/YYYY, HH:mm')
  }
}
</script>

<style scoped>
  .message {
    padding: 6px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 2px 2px 1px #bbb;
  }
  .text-date {
    margin-top: 2px;
    color: gray;
    font-size: 0.65rem;
    text-align: end;
  }
  .message-container {
    display: flex;
    padding: 10px;
  }
  .message-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    max-width: 20rem;
    margin-left: 6px;
  }
</style>
