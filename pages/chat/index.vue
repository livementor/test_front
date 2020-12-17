<template>
  <div class="h-full">
    {{ $t('chat.noConversation') }}
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  layout: 'chat',
})
export default class ChatRoot extends Vue {

}
</script>
