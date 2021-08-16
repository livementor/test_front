<template>
  <div class="min-h-screen flex flex-col">
    <HeaderComponent />
    <GlobalNotification
      v-if="getNotification !== undefined"
      :notification="getNotification"
    />
    <Nuxt class="relative flex flex-grow" />
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
