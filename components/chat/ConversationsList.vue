<template>
  <div>
    <div v-for="(conversation, index) in conversations" :key="index">
      <Conversation :conversation="conversation" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import Conversation from '~/components/chat/Conversation.vue'

@Component({
  components: {
    Conversation,
  },
})
export default class ConversationsList extends Vue {
  @Getter('conversations/getConversations') getConversations:any

  get conversations () {
    if (!this.$fire.auth.currentUser) {
      return []
    }
    return Object.entries(this.getConversations).map(([k, v]: any) => ({ ...v, id: k }))
  }
}
</script>
