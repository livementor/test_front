<template>
  <div
    class="message-item"
  >
    <div
      class="message-item__wrapper"
      :class="{ 'message-item__you': isAuthUser}"
    >
      <div class="message-item__author">
        {{ currentUser.displayName || 'You' }}
      </div>
      <div class="message-item__date">
        {{ messageDate }}
      </div>
      <div class="message-item__text">
        {{ message.text }}
      </div>
      <div class="message-item__avatar">
        <img :src="require('@/assets/img/user.svg')">
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import dayjs from 'dayjs'
import { Getter } from 'vuex-class'
import { Component, Vue, Prop } from 'vue-property-decorator'
import { User } from '~/models/user'

@Component
export default class MessageItem extends Vue {
  @Getter('users/getUserById') getUserById:any
  @Prop({ required: true, type: Object }) readonly message: any

  get currentUser ():User | null {
    return this.isAuthUser ? 'You' : this.getUserById(this.message?.author)?.user
  }

  get isAuthUser () {
    return this.message?.author === this.$store.state.authUser
  }

  get messageDate () {
    return dayjs(this.message?.createdAt).format('DD/MM/YYYY HH:mm')
  }
}
</script>

<style>
.message-item {
  width: 100%;
  position: relative;
}
.message-item__author {
  font-weight: bold;
}
.message-item__avatar {
  position: absolute;
  top: -.5rem;
  left: -.5rem;
}
.message-item__avatar img {
  height: 3rem;
}
.message-item__wrapper {
  position: relative;
  width: 80%;
  background-color: #404041;
  margin: 1rem;
  padding: 2rem;
  border-radius: 999px;
  float: left;
}
.message-item__you {
  background-color: #656566;
  left: initial;
  float: right;
}
</style>
