<template>
  <div class="conversation-list">
    <template v-for="(item, index) in conversationsIds">
      <NuxtLink
        :key="`link-${index}`"
        :to="`/chat/conversations/${item.id}`"
        class="text-blue-livementor"
      >
        <div class="conversation-list__item">
          <span class="conversation-list__item-label">{{ item.title }}</span>
        </div>
      </NuxtLink>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

@Component({
  name: 'ConversationList',
})
export default class ConversationList extends Vue {
  @Getter('conversations/getConversations') getConversations:any

  get conversationsIds () {
    if (!this.$fire.auth.currentUser) {
      return []
    }
    return this.getConversations
  }
}
</script>

<style>
.conversation-list__item {
  height: 50px;
  display: flex;
  align-items: center;
  border: 0;
  padding: 1rem;
  background-color: #252526;
  transition: background-color .3s ease-in-out;
}
.conversation-list__item:hover {
  background-color: #454547;
}
</style>
