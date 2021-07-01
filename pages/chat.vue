<template>
  <div v-if="isLoadingComplete" class="flex">
    <div class="w-1/4">
      <ConversationList class="border" />
    </div>
    <NuxtChild class="w-3/4" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

@Component
export default class Chat extends Vue {
  isConversationsFetched = false
  isUsersFetched = false

  @Getter('conversations/getConversations') getConversations:any

  get isLoadingComplete () {
    return this.isConversationsFetched && this.isUsersFetched
  }

  async fetchConversationsUsers () {
    const promises: any[] = []
    try {
      Object.entries(this.getConversations).forEach(([_, conversation]: [string, any]) => {
        promises.push(
          this.$store.dispatch('users/fetchUsersByIds', conversation.participants),
        )
      })

      await Promise.all(promises)
      this.isUsersFetched = true
    } catch (error) {
      // @todo: show a toast or an understandable error to the user
      // eslint-disable-next-line no-console
      console.error(error)
    }
  }

  async fetchConversations () {
    try {
      await this.$store.dispatch('conversations/fetchConversationsForCurrentUser')
      this.isConversationsFetched = true
    } catch (error) {
      // @todo: show a toast or an understandable error to the user
      // eslint-disable-next-line no-console
      console.error(error)
    }
  }

  @Watch('$store.state.users.authUser', { immediate: true })
  async onChange (value: any) {
    if (value !== null && value !== undefined && value !== '') {
      await this.fetchConversations()
      await this.fetchConversationsUsers()
    }
  }
}
</script>
