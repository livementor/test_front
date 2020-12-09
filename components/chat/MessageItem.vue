<template>
  <div class="message">
    <div class="message-author"> {{ message.author }} </div>
    <div class="message-text"> {{ message.text }} </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import { Message } from '~/models/message'

@Component
export default class MessageItem extends Vue {
  @Prop() message!: Message
}
</script>

<style scoped>

.message {
  padding: 15px;
}

.message-author  {
  padding-right: 15px;
  font-weight: bolder;
}
.message-author, .message-text  {
  display: inline-block;
}
.message-text {
  background-color: antiquewhite;
}

</style>