<template>
  <div v-if="user && user.name">
    <img
      v-if="user.avatar"
      :alt="user.name"
      :src="user.avatar"
      :style="{ height: `${size}px`, width: `${size}px` }"
      class="bg-green-livementor rounded-full flex items-center justify-center"
    />
    <div
      v-else
      :style="{ height: `${size}px`, width: `${size}px` }"
      class="bg-green-livementor rounded-full flex items-center justify-center"
    >
      <p class="text-white font-bold">{{ initials }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { User } from "~/models/user";

@Component
export default class Avatar extends Vue {
  @Prop({ required: true }) user!: User;
  @Prop({ default: 36 }) size!: number;

  get initials() {
    return this.user.name
      .split(" ")
      .map((str) => str[0])
      .join("");
  }
}
</script>

<style scoped>
</style>
