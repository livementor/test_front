<template>
  <div>
    <ConversationListItem
      v-for="conversation in conversations"
      :key="conversation.id"
      :conversation="conversation"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

@Component
export default class ConversationList extends Vue {
  @Getter('conversations/getConversations') conversations:any
}
</script>
