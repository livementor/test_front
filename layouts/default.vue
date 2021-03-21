<template>
  <div class="h-screen flex" style="flex-direction: column;">
    <HeaderComponent />
    <GlobalNotification v-if="getNotification !== undefined" :notification="getNotification" />
    <div class="overflow-hidden" style="flex-grow: 1;">
      <Nuxt />
    </div>
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
