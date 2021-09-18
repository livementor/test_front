<template>
  <button class="btn btn-primary rounded px-4">
    {{ text }}
  </button>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class Button extends Vue {
  @Prop({ default: 'button' }) text!: string
}
</script>

