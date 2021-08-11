<template>
  <svg>
    <use
      v-bind="{
        'xlink:href': '/svg/sprite.svg#' + name,
      }"
    />
  </svg>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class BaseIcon extends Vue {
  @Prop({ required: true }) name!: string;
}
</script>

<style scoped></style>
