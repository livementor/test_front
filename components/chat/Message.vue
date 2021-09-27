<template>
  <div class="message">
    <div class="message-header">
      <span class="message-author">
        {{ message.user ? (message.user.displayName || message.user.email) : 'Unknown user' }}
      </span>

      <span class="message-date">
        {{ message.prettyDate }}
      </span>
    </div>
    <p v-if="message.text">
      {{ message.text }}
    </p>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { Message } from '~/models/message'
import { User } from '~/models/user'

export default Vue.extend({
  name: 'Message',
  props: {
    message: {
      type: Object as PropType<Message & {prettyDate: string, user: User}>,
    },
  },
})
</script>

<style scoped>
.message {
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 0 0.5em 1em -0.125em rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.02);
  color: #4a4a4a;
  display: block;
  padding: 1rem;
  margin: 1rem;
}

.message .message-date {
  font-size: 0.8rem;
}

.message .message-author {
  font-size: 0.9rem;
  font-weight: bold;
}
</style>
