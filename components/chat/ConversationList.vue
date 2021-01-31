<template>
  <div class="bg-grey-lighter flex-1 overflow-auto">
      <NuxtLink v-for="(conversation, index) in conversations" :key="index" class="px-3 flex items-center bg-grey-light cursor-pointer" :to="`/chat/conversations/${conversation.id}`">
          <div>
            <Avatar />
          </div>
          <div class="ml-4 flex-1 border-b border-grey-lighter py-4">
            <div class="flex items-bottom justify-between">
                <p class="text-grey-darkest">
                    {{ conversation.title }}
                </p>
                <p class="text-xs text-grey-darkest">
                    00:00 am
                </p>
            </div>
            <p class="text-grey-dark mt-1 text-sm">
                Last message
            </p>
        </div>
      </NuxtLink>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

@Component
export default class ConversationList extends Vue {
  @Getter('conversations/getConversations') getConversations:any
  @Getter('users/getAuthUser') authUser!: string;

  get conversations () {
    if (!this.$fire.auth.currentUser) {
      return []
    }
    return this.getConversations
  }
}
</script>
