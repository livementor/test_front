<template>
  <div class="p-2 space-y-5">
    <div v-if="!conversations || !conversations.length">
      Aucune conversation pour le moment
    </div>
    <template v-else>
      <div v-for="conversation in conversations" :key="conversation.id">
        <ConversationPreview
          :conversation="conversation"
          :isActive="conversation.id === $route.params.id"
        />
      </div>
    </template>
  </div>
</template>

<script>
import ConversationPreview from '@/components/chat/ConversationPreview'
import { mapState } from 'vuex'

export default {
  components: {
    ConversationPreview,
  },

  computed: {
    ...mapState('conversations', {
      conversations: 'conversations',
    }),
  },
}
</script>
