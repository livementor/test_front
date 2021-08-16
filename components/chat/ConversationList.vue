<template>
  <div>
    <div class="font-bold text-20 p-3">
      Messages
    </div>
    <div class="bg-white">
      <ul>
        <li
          v-for="(conversation, index) in conversations"
          :key="index"
          class="flex items-center p-3 hover:bg-blue-100 hover:text-blue-50"
        >
          <img
            class="w-10 h-10 rounded-full mr-4"
            src="https://picsum.photos/100"
            alt="Avatar of Writer"
          >
          <NuxtLink :to="`/chat/conversations/${conversation.id}`" class="text-blue-livementor">
            <div class="text-sm">
              <p class="text-gray-900 leading-none">
                {{ conversation.title }}
              </p>
              <p class="text-gray-600">
                Aug 18
              </p>
            </div>
          </NuxtLink>
        </li>
        <li
          class="flex items-center p-3 hover:bg-blue-100 hover:text-blue-50"
        >
          <img
            class="w-10 h-10 rounded-full mr-4"
            src="https://picsum.photos/100"
            alt="Avatar of Writer"
          >
          <div class="text-sm">
            <p class="text-gray-900 leading-none">
              John Smith
            </p>
            <p class="text-gray-600">
              Aug 18
            </p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import { Conversation } from '~/models/conversation'

@Component
export default class ConversationList extends Vue {
  @Getter('conversations/getConversations') getConversations: any

  get conversations (): Array<Conversation> {
    if (!this.$fire.auth.currentUser) {
      return []
    }

    return this.getConversations
  }
}
</script>
