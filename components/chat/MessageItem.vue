<template>
  <div class="message"  :class="{ 'me': isMe }">
    <div class="message-date"> {{ messageDate }} </div>
    <div v-if="!isMe" class="message-author"> {{ message.author }} </div>
    <div class="message-text"> {{ message.text }} </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Message } from '~/models/message'

@Component
export default class MessageItem extends Vue {
  @Prop() message!: Message

  get messageDate () {
    const date = new Date(this.message.createdAt)
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString().substring(0, 5)
  }

  get isMe () {
    return this.message.author === this.$store.state.users.authUser.id
  }
}
</script>

<style scoped>

.message {
  position: relative;
  padding: 15px;
  clear: both;
  text-align: left;
}
.message.me  {
  text-align: right;
}

.message-date {
  text-align: center;
  color:grey;
  font-size: 0.7em;
  margin-bottom: 5px;
}

.message-author  {
  padding-right: 15px;
  font-weight: bolder;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  overflow: hidden;
  border: 1px black solid;
  margin-right: 20px;
}

.message-author, .message-text  {
  display: inline-block;
}

.message-text {
  background-color: antiquewhite;
  padding: 20px;
  text-align: left;
  border-radius: 5px;
}

</style>
