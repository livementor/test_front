<template>
  <div class="container items-center">
    <img
      class="h-10 w-10 rounded-full"
      :src="`https://xsgames.co/randomusers/assets/avatars/male/${conversation.img}.jpg`"
      alt=""
    >
    <div class="text-title">
      {{ conversation.title }}
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

  @Watch('conversations', { immediate: true })
  onConversationsChanged () {
    this.conversation = this.getConversationById(this.id)
  }
}
</script>

<style scoped>
  .container {
    display: flex;
    padding: 18px;
  }
  .text-title {
    font-weight: 500;
    font-size: 2rem;
    color: black;
    margin-left: 10px;
  }
</style>
