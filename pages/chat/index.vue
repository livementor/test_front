<template>
  <div class="d-flex justify-content-center align-items-center">
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

<style scoped>
  div {
    background: #ececec;
  }
</style>
