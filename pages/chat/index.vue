<template>
  <div>
    <img class="img-nothing" src="https://media1.giphy.com/media/idwUtDdOYJ9i41vFEz/giphy.gif" />
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
.img-nothing {
  margin: auto
}
</style>
