<template>
  <div class="flex" :class="{
    'justify-end': message.isMine
  }"
  >
    <article :class="{
      'mine': message.isMine,
      'not-mine': !message.isMine
    }" class="c-message my flex p-4 space-x-4 hover:bg-gray-100 rounded-md"
    >
      {{ message.text }}
    </article>
  </div>
</template>

<script lang="ts">
import { Prop } from 'nuxt-property-decorator'
import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

@Component
export default class Message extends Vue {
  @Getter('conversations/getConversations') getConversations:any

  @Prop()
  message!: any
}
</script>

<style>
.c-message {
  padding: 10px;
  max-width: 40%;
  margin-bottom: 20px;
  border-radius: 20px;
}

.c-message.mine {
  background-color: #0099ff;
  color: white;
}

.c-message.not-mine {
  background-color: #e4e6eb;
  color: #050505;
}
</style>
