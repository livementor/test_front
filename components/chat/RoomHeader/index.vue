<template>
  <div class="room-header w-full font-bold p-4 maz-flex-fixed">
    <p>
      {{ $t('chat.selected_conversation', { roomTitle: getConversations[conversationId] && getConversations[conversationId].title ? getConversations[conversationId].title : 'Conversation' }) }}
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import { Conversation } from '~/models/conversation'

@Component
export default class MessageComponent extends Vue {
  @Prop({ required: true }) conversationId!: string
  @Getter('conversations/getConversations') getConversations!: () => { [key: string]: Conversation }
}
</script>

<style lang="scss" scoped>
.room-header {
  border-bottom: 0.125rem solid #F2F2F2;
  font-size: 1.2rem;
}
</style>
