<template>
      <div
        class="flex-row"
        :class="[isFromAuthor(message.author) ? 'self-end' : 'self-start']"
      >
        <div
          class="message"
          :class="{'blue-background' : isFromAuthor(message.author)}"
        >
          <span>{{ message.text }}</span>
        </div>
      </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

const Props = Vue.extend({
  props: {
    message: Object,
  },
})

@Component
export default class Conversations extends Props {

  isFromAuthor (author: any) {
    return this.$store.state.users.authUser !== author // I did it like that because when we send the message apparently the id is the recipient id
  }
}
</script>
<style scoped>
.message{
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  border-radius: 20%;
  background-color: #E9EBEE;
}
.blue-background{
  background-color: #0078FF;
  color: white;
}
</style>
