<template>
  <div>
      <NuxtLink :to="`/chat/conversations/${conversation.id}`" class="text-blue-livementor">
        {{ conversation.title }}
      </NuxtLink>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import { Conversation } from '~/models/conversation'

@Component
export default class ConversationListItem extends Vue {
  @Prop() conversation!: Conversation
  @Getter('users/getUser') getCorrespondant:any
}
</script>
