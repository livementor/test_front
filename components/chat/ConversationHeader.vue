<template>
  <div class="flex sm:items-center bg-white justify-between py-3 border-b-2 border-gray-200">
    <div class="flex items-center space-x-4 px-3">
      <img
        src="https://picsum.photos/100"
        alt="Profile Picture"
        class="w-6 h-6 rounded-full"
      >
      <div class="flex flex-col leading-tight">
        <div class="text-2xl mt-1 flex items-center">
          <span class="text-sm text-gray-600">{{ name }}</span>
        </div>
        <span class="mr-3">{{ title }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { Getter, State } from 'vuex-class'
import * as lodash from 'lodash'

@Component
export default class ConversationHeader extends Vue {
  @Prop() readonly id: string | undefined
  @Getter('conversations/getConversationById') getConversationById: any
  @State('conversations') conversations: any;
  title: string = this.$t('chat.undefinedTitle') + ''

  get name (): string {
    return lodash.capitalize(this.$t('name') + '')
  }

  @Watch('conversations', { immediate: true })
  onConversationsChanged () {
    const conversation = this.getConversationById(this.id)

    if (
      conversation &&
      conversation.title !== undefined &&
      conversation.title !== null &&
      conversation.title !== ''
    ) { this.title = conversation.title }
  }
}
</script>

<style scoped>

</style>
