<template>
  <div class="ConversationList">
    <b-list-group>
      <conversation-list-item
        v-for="(conversation, key) in getConversations"
        :key="key"
        :conversation="conversation"
      />
    </b-list-group>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

@Component
export default class ConversationList extends Vue {
  @Getter('conversations/getConversations') getConversations:any
}
</script>

<style scoped>
.ConversationList {
  /* Header height = 64px*/
  height: calc(100vh - 64px);
}
</style>
