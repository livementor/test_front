<template>
  <div>
    {{ $t('chat.noConversation') }}
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class ChatRoot extends Vue {}
</script>
