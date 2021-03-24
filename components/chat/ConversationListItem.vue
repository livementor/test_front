<template>
  <NuxtLink
    :to="`/chat/conversations/${conversation.id}`"
    class="block p-3 border-b-2"
  >
    <p class="text-lg text-black font-semibold">
      {{ conversation.title }}
    </p>
    <ParticipantList
      :participants="conversation.participants"
      class="text-sm text-black font-medium"
    />
  </NuxtLink>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class ConversationListItem extends Vue {
  @Prop() conversation:any
}
</script>
