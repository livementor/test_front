<template>
  <component
    :is="component"
    v-bind="$attrs"
    class="button btn btn-primary rounded px-4 maz-dots-text"
    :class="{ 'w-full': block }"
    @click="$emit('click', $event)"
  >
    <template v-if="text">
      {{ text }}
    </template>
    <slot v-else />
  </component>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class Button extends Vue {
  @Prop({ default: null }) text!: string
  @Prop({ default: false }) block!: boolean

  get component () {
    const { href, to } = this.$attrs
    if (href) { return 'a' } else if (to) { return 'nuxt-link' }
    return 'button'
  }
}
</script>

<style lang="scss" scoped>
.button {
  border-radius: 0.75rem;
}
</style>
