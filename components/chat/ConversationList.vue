<template>
  <div>
    <span>Conversations ids</span>
    <div v-for="(id, index) in conversationsIds" :key="index">
      <NuxtLink :to="`/chat/conversations/${id}`"
                class="text-blue-livementor"
      >
        {{ id }}
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

  get conversationsIds () {
    if (!this.$fire.auth.currentUser) {
      return []
    }
    return Object.keys(this.getConversations)
  }
}
</script>
