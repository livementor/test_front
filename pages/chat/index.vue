<template>
  <div class="maz-flex maz-flex-center maz-direction-column">
    {{ $t('chat.noConversation') }}
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class ChatRoot extends Vue {
}
</script>
