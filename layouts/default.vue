<template>
  <div class="h-full">
    <HeaderComponent />
    <GlobalNotification v-if="getNotification !== undefined" :notification="getNotification" />
    <Nuxt />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import HeaderComponent from '@/components/global/LMHeader.vue'
import GlobalNotification from '@/components/global/GlobalNotification.vue'

export default Vue.extend({
  components: { HeaderComponent, GlobalNotification },
  computed: {
    ...mapGetters(['getNotification']),
  },

})
</script>

<style>
body, html, #__nuxt, #__layout {
  height: 100%;
}
</style>
