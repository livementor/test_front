<template>
  <button
    class="p-3 rounded border-2 border-blue-800 text-blue-800 hover:text-white hover:bg-blue-700"
    @click="$emit('click')"
  >
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

<style scoped>

</style>
