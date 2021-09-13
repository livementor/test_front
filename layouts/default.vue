<template>
  <div>
    <HeaderComponent />
    <GlobalNotification v-if="getNotification !== undefined" :notification="getNotification" />
    <v-container fluid>
      <Nuxt />
    </v-container>
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
