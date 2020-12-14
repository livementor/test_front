<template>
  <div class="flex items-center justify-center text-gray-500 font-bold text-2xl">
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
