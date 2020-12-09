<template>
  <NuxtLink :to="`/chat/conversations/${conversation.id}`">
    <div class="conversation" :class="{ 'selected': isSelected }">
      <div class="conversation-avatar"></div>
      <div class="conversation-title">{{ conversation.title }}</div>
    </div>
  </NuxtLink>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Conversation } from '~/models/conversation'

@Component
export default class ConversationItem extends Vue {
  @Prop() conversation!: Conversation

  get isSelected () {
    return this.conversation.id === this.$route.params.id
  }
}
</script>

<style scoped>
.conversation {
  padding: 10px;
  margin: 2px;
  vertical-align: middle;
}

.conversation.selected {
  background-color: rgb(233, 252, 244);
}

.conversation-avatar {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  overflow: hidden;
  border: 1px black solid;
  background: white;
}

.conversation-title  {
  padding-left: 10px;
}

.conversation-avatar, .conversation-title  {
  display: table-cell;
}

</style>
