<template>
  <div class="flex flex-row items-start pt-10">
    <div class="p-8 mx-auto bg-white rounded-xl shadow-sm">
      <span class="font-semibold">{{ $t('chat.noConversation') }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class ChatRoot extends Vue {

}
</script>
