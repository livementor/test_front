<template>
  <div>
    <Header />
    <GlobalNotification v-if="getNotification !== undefined" :notification="getNotification" />
    <Nuxt />
  </div>
</template>

<script lang="ts">
import { Component, Getter, Vue } from 'nuxt-property-decorator'
import { Notification } from '~/models/notification'

@Component
export default class Default extends Vue {
  @Getter getNotification?: Notification
}
</script>
