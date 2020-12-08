<template>
  <div>
    <div v-for="(conversation, i) in conversations" :key="i">
      <NuxtLink :to="`/chat/conversations/${conversation.id}`">
        <div
          class="hover:bg-gray-100 mx-2 px-4 py-4 rounded-2xl"
          v-bind:class="{
            'bg-green-100': conversation.id === $route.params.id,
          }"
        >
          <span class="font-bold mb-2">
            {{ conversation.title }}
          </span>
          <div>
            <span
              v-for="(participant, j) in conversation.participants"
              :key="j"
              class="text-gray-600 text-xs"
            >
              {{ participant }}
            </span>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

@Component
export default class ConversationList extends Vue {
  @Getter('conversations/getConversations') getConversations: any

  get conversations () {
    if (!this.$fire.auth.currentUser) {
      return []
    }
    return this.getConversations
  }
}
</script>
