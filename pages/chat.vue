<template>
  <div class="flex h-full">
    <div class="w-2/5 p-4 pr-0 pb-0 border-r-2 border-gray-200" style="max-height: 100%; display: flex; flex-direction: column;">
      <div class="mb-5 flex items-center p-4 mr-4">
        <div class="mr-5">
          <img src="https://dummyimage.com/50x50/000/fff" loading="lazy" alt="" class="rounded-full object-cover bg-gray-200">
        </div>
        <div class="font-bold text-24 text-gray-800 mr-2">
          Discussions
        </div>
        <div style="float: right" class="bg-gray-200 p-2 rounded-full justify-self-end">
          <svg class="text-gray-500 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
      </div>
      <div class="overflow-y-auto" style="flex: 1">
        <ConversationsList />
      </div>
    </div>
    <NuxtChild class="w-3/5" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import ConversationsList from '~/components/chat/ConversationsList.vue'

@Component({
  layout: 'chat',
  components: {
    ConversationsList,
  },
})
export default class Chat extends Vue {
  @Watch('$store.state.users.authUser', { immediate: true })
  onChange (value: any) {
    if (value !== null && value !== undefined && value !== '') {
      this.$store.dispatch('conversations/fetchConversationsForCurrentUser')
    }
  }
}
</script>
