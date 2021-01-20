<template>
  <div class="default maz-flex maz-direction-column">
    <HeaderComponent class="maz-flex-fixed" />
    <GlobalNotification v-if="getNotification !== undefined" :notification="getNotification" />
    <Nuxt />
  </div>
</template>

<script lang="ts">
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['getNotification']),
  },
}
</script>
