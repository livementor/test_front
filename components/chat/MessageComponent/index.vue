<template>
  <div
    class="message maz-flex maz-align-start"
    :class="{ 'maz-justify-start maz-direction-row-reverse': isAuthUser }"
  >
    <div class="message__author maz-text-muted maz-flex maz-flex-center mt-1" :class="[isAuthUser ? 'ml-4' : 'mr-4']">
      <span>{{ isAuthUser ? 'ME' : authorInitial }}</span>
    </div>
    <div
      class="message__text p-4"
      :class="{ 'is-auth-user': isAuthUser}"
    >
      <p>{{ text }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import { Message } from '~/models/message'

@Component
export default class MessageComponent extends Vue {
  @Prop({ required: true }) message!: Message

  @Getter('users/getAuthUser') authUser!: string

  get text () {
    return this.message.text
  }

  get author () {
    return this.message.author
  }

  get authorInitial () {
    return this.message.author.substring(0, 2).toUpperCase()
  }

  get isAuthUser () {
    return this.authUser === this.author
  }
}
</script>

<style lang="scss" scoped>
.message {

  &__author {
    font-size: 1rem;
    border-radius: 50%;
    height: 40px;
    width: 40px;
    background-color: rgba(0, 0, 0, 0.1);
  }

  &__text {
    display: block;
    background-color: rgba(#4fc1b5, 0.2);
    border-radius: 0.75rem;
    max-width: 50%;
    display: inline-flex;

    &.is-auth-user {
      background-color: rgba(blue, 0.2);
    }
  }
}
</style>
