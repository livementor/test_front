<template>
  <div class="flex">
    <div class="max-w-sm w-full p-5 space-y-5 bg-gray-100">
      <div class="font-bold text-3xl">
        Messagerie
      </div>
      <ConversationList />
    </div>
    <NuxtChild class="p-5 h-screen flex-grow" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ConversationList from '@/components/chat/ConversationList'

export default {
  components: {
    ConversationList,
  },

  computed: {
    ...mapState('users', {
      user: 'user',
    }),
  },

  watch: {
    user: {
      immediate: true,
      handler(value) {
        if (value !== null && value !== undefined && value !== '') {
          this.$store.dispatch('conversations/fetchConversationsForCurrentUser')
        }
      },
    },
  },
}
</script>
