<template>
  <header class="space-y-0.5 text-center border-b-2">
    <p class="text-lg text-black font-semibold">
      {{ conversation.title }}
    </p>
    <ParticipantList
      :participants="conversation.participants"
      class="text-sm text-black font-medium"
    />
  </header>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

const dummyConvValue = {
  title: '',
  participants: [],
}

@Component
export default class ConversationHeader extends Vue {
  @Prop() conversationId:any
  @Getter('conversations/getConversationById') getConversationById: any

  get conversation () {
    return this.getConversationById(this.conversationId) || dummyConvValue
  }
}
</script>

<style>
</style>
