<template>
  <div class="message">
    <div class="date">
      {{ new Date(msg.createdAt).toLocaleDateString() }}
    </div>
    <div class="second-line">
      <div class="avatar">
        <img src="~/assets/avatar.png"></img>
      </div>
      <div class="text">
        {{ msg.text }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
@Component
export default class Message extends Vue {
  @Prop() msg?: string

  imageOfUser (userId:string) {
    const avatar = this.$store.getters['users/getUserById'](userId)
    return avatar.avatar_url
  }
}
</script>
<style>
  .message {
    padding: 10px;
  }

  .message .date {
    color: grey;
    font-size: 0.8em;
    text-align: center;
  }

  .message .text {
    border: 1px solid grey;
    border-radius: 10px;
    padding: 10px;
    width: 60%;
    background-color: white;
  }

  .message .second-line {
    display: flex;
  }

  .message .avatar {
    height: 50px;
    width: 50px;
    padding-right: 15px;
  }
</style>
