<template>
  <button
    :class="[
      'bg-gray-200',
      'border',
      'border-gray-300',
      'focus:outline-none',
      'focus:border-gray-600',
      'rounded',
      'px-2',
      'py-4',
      'm-auto',
      'inset-0',
      'text-xl',
      'font-semibold',
      'leading-7',
      'text-center',
      'text-gray-800',
      'hover:bg-green-200',
      'hover:border-gray-600',
      'focus:bg-green-200',
      { 'btn--active': active },
    ]"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class Button extends Vue {
  @Prop({ default: "button" }) text!: string;
  @Prop({ default: false }) active!: Boolean;
}
</script>

<style scoped>
.btn--active {
  @apply bg-green-200;
}

.btn--small {
  @apply py-2;
}

.btn--small:last-child {
  @apply ml-0;
}
</style>
