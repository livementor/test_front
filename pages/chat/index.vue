<template>
  <div class="flex flex-col items-center justify-center flex-grow">
    <p class="text-5xl">💬</p>
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
