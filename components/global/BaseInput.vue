<template>
  <div class="mb-3 flex flex-col-reverse">
    <div class="relative">
      <input
        v-bind="$attrs"
        :id="id"
        :value="value"
        v-on="listeners"
        @input="updateValue"
        :class="[
          'm-auto',
          'text-sm',
          'bg-gray-100',
          'py-1',
          'px-2',
          'rounded',
          'w-full',
          'border',
          'border-gray-300',
          'focus:outline-none',
          'focus:border-green-600',
          classes,
          { 'border-red-600': error },
        ]"
      /><slot />
    </div>
    <label
      v-if="label"
      :for="id"
      class="mb-1 text-md text-gray-700 cursor-pointer"
      >{{ label }}</label
    >
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({ inheritAttrs: false })
export default class BaseIcon extends Vue {
  @Prop({ required: true }) id!: string;
  @Prop({ required: true }) value!: [string, number];
  @Prop({ required: false, default: "" }) label!: string;
  @Prop({ required: false, default: "" }) classes!: string;
  @Prop({ required: false, default: false }) error!: boolean;

  get listeners() {
    return {
      ...this.$listeners,
      input: this.updateValue,
    };
  }

  updateValue(event: any) {
    this.$emit("input", event.target.value);
  }
}
</script>

<style scoped></style>
