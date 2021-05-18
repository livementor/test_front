<template>
  <div v-if="notification !== undefined" :class="['absolute z-10 w-full h-10 flex items-center bg-green-livementor', { 'bg-red-error' : isError }]">
    <span class="m-auto text-white">
      {{ notification.message }}
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { Notification, NotificationType } from '~/models/notification'

@Component
export default class GlobalNotification extends Vue {
  @Prop() notification?: Notification
  @Watch('notification', { immediate: true })
  onError (val: Notification, _: unknown) {
    if (val !== undefined) {
      setTimeout(() => {
        this.$store.dispatch('hideNotification')
      }, 5000)
    }
  }

  get isError (): boolean {
    return this.notification ? this.notification.type === NotificationType.ERROR : false
  }
}
</script>
