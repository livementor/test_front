<template>
  <div class="flex items-center p-3 hover:bg-blue-100 hover:text-blue-50">
    <img
      class="w-10 h-10 rounded-full mr-4"
      :src="`https://i.pravatar.cc/100?img=${conversation.img}`"
      alt="Avatar"
    >
    <NuxtLink
      :to="`/chat/conversations/${conversation.id}`"
      class="text-blue-livementor"
    >
      <div class="text-sm">
        <p class="text-gray-900 leading-none">
          {{ conversation.title }}
        </p>
      </div>
    </NuxtLink>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Conversation } from '~/models/conversation'
@Component
export default class ConversationAttendees extends Vue {
  @Prop() readonly conversation: Conversation | undefined
}
</script>

<style scoped>

</style>
