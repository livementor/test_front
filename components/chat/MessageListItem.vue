<template>
  <div class="w-3/4 sm:p-2 sm:m-2 rounded">
    <p>
      {{ text }}
    </p>
    <p class="text-sm text-grey-500 font-small">
      {{ new Date(date).toUTCString() }}
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class MessageListItem extends Vue {
  @Prop() text!: string
  @Prop() date!: number
}
</script>

<style>
</style>
