<template>
  <div
    v-if="notification !== undefined"
    :class="[
      'relative z-10 w-full flex items-center p-2',
      { 'bg-red-600': isError, 'bg-green-300': !isError },
    ]"
  >
    <span class="m-auto text-white">
      {{ notification.message }}
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { INotification, NotificationType } from "@/models/notification";

@Component
export default class GlobalNotification extends Vue {
  @Prop() notification?: INotification;
  @Watch("notification", { immediate: true })
  onError(val: INotification, _: INotification) {
    if (val !== undefined) {
      setTimeout(() => {
        this.$store.dispatch("hideNotification");
      }, 5000);
    }
  }

  get isError(): boolean {
    return this.notification
      ? this.notification.type === NotificationType.ERROR
      : false;
  }
}
</script>
