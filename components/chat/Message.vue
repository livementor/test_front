<template>
  <div class="flex-row" :class="[isFromAuthor(message.author) ? 'self-end' : 'self-start']">
    <div class="message p-4 mb-4 rounded-full py-3 px-6 shadow-md" :class="{'blue-background text-white' : isFromAuthor(message.author)}">
      <span>{{ message.text }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

const Props = Vue.extend({
  props: {
    message: { type: Object, default: () => ({ text: '' }) },
  },
})

@Component
export default class Message extends Props {
  isFromAuthor (author: any) {
    return this.$store.state.users.authUser !== author // I did it like that because when we send the message apparently the id is the recipient id
  }
}
</script>
<style scoped>
.message {
  background-color: #e9ebee;
}
.blue-background {
  background-color: #0078ff;
}
</style>
