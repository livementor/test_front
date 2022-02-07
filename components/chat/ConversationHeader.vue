<template>
  <div class="bg-white px-4 py-5 border-b border-gray-200 sm:px-6">
    <div class="-ml-4 -mt-4 flex justify-between items-center flex-wrap sm:flex-nowrap">
      <div class="ml-4 mt-4">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <img class="h-10 w-10 rounded-full" :src="`https://i.pravatar.cc/150?img=${img}`" alt="">
          </div>
          <div class="ml-4">
            <p class="text-sm text-gray-500 Ca">
              {{ $t('chat.name') }}
            </p>
            <h3 class="text-lg leading-6 font-medium text-gray-600">
              {{ title }}
            </h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { Getter, State } from 'vuex-class'
import { Conversation } from '~/models/conversation'

@Component
export default class ConversationHeader extends Vue {
  @Prop() readonly id: string | undefined
  @State('conversations') conversations: any;
  @Getter('conversations/getConversationById') getConversationById: any

  conversation = {} as Conversation
  title = ''
  img = 0

  @Watch('conversations', { immediate: true })
  onConversationsChanged () {
    this.conversation = this.getConversationById(this.id)
    this.title = this.conversation ? this.conversation.title : ''
    this.img = this.conversation ? this.conversation.img : 0
  }
}

</script>

<style scoped>

</style>
