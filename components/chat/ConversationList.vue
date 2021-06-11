<template>
  <div>
    <div v-for="conversation in getConversations" :key="conversation.id">
      <NuxtLink :to="`/chat/conversations/${conversation.id}`" class="text-blue-livementor">
        <conversation-item :item="conversation" />
      </NuxtLink>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ConversationItem from './ConversationItem'
export default {
  components: { ConversationItem },
  computed: {
    ...mapGetters('conversations', ['getConversations']),
  },
}
</script>
