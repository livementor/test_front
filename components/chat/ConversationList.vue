<template>
  <div>
    <span>Conversations ids</span>
    <div v-for="(item, index) in conversations" :key="index">
      <NuxtLink :to="`/chat/conversations/${item.id}`" class="text-blue-livementor">
        {{ item.id }}
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

@Component
export default class ConversationList extends Vue {
  @Getter('conversations/getConversations') getConversations:any

  get conversations () {
    if (!this.$fire.auth.currentUser) {
      return []
    }
    return this.getConversations
  }
}
</script>
