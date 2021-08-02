<template>
  <div class="default">
    <HeaderComponent />
    <GlobalNotification v-if="getNotification !== undefined" :notification="getNotification" />
    <Nuxt class="nuxt" />
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
  body, html, div#__nuxt,
  #__layout,
  #__layout > div,
  #app,
  .nuxt {
    height: 100%;
    overflow-y: hidden;
  }
</style>
