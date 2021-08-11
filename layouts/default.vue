<template>
  <div>
    <HeaderComponent />
    <GlobalNotification
      v-if="getNotification !== undefined"
      :notification="getNotification"
    />
    <Nuxt />

    <div class="resizer">
      <resize-observer @notify="handleResize" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapGetters } from "vuex";
import GlobalNotification from "@/components/global/GlobalNotification.vue";
import HeaderComponent from "~/components/global/Header.vue";

export default Vue.extend({
  components: { GlobalNotification, HeaderComponent },
  computed: {
    ...mapGetters(["getNotification", "getLocale"]),
  },
  mounted() {
    const params = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    this.$store.dispatch("windowParams/updateParams", params);
  },
  methods: {
    handleResize({ width, height }: any) {
      this.$store.dispatch("windowParams/updateParams", { width, height });
    },
    ...mapActions("popin", ["updateData"]),
  },
});
</script>
