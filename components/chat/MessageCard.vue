<template>
  <div>
    <div class="text-center">{{ messageDateAndTime }}</div>
    <div class="flex items-start">
      <img :src="userDetailsById(message.author).photoURL" alt="picture" class="h-10 w-10 rounded-full">
      <span class="bg-white rounded-lg mx-4 p-3">{{ message.text }}</span>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import { Message } from '~/models/message'

@Component
export default class MessageCard extends Vue {
  @Prop({ required: true }) message!: Message
  @Getter('users/getUsers') getUsers: any

  get messageDateAndTime (): string {
    const date = new Date(this.message.createdAt)
    return `${date.toDateString()}, ${date.toLocaleTimeString()}`
  }

  userDetailsById (userId: string) {
    const userDetails = this.getUsers.find((u: any) => u.id === userId)
    return userDetails || {}
  }
}
</script>
