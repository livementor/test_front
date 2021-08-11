<template>
  <div class="flex items-center justify-center">
    <div class="relative inline-block text-left dropdown z-50">
      <button
        class="
          flex
          items-center
          justify-center
          w-full
          px-2
          py-2
          text-sm
          font-medium
          leading-5
          text-gray-700
          transition
          duration-150
          ease-in-out
          bg-white
          border border-gray-300
          rounded-md
          hover:text-green-600
          focus:outline-none
          focus:border-green-600
          focus:shadow-outline-green-600
          active:bg-gray-50 active:text-green-600
        "
        type="button"
        aria-haspopup="true"
        aria-expanded="true"
        aria-controls="navigation-settings"
      >
        <BaseIcon name="cog" class="w-6 h-6" />
        <img
          v-if="showLogout"
          class="rounded-full w-8 h-8 ml-2"
          src="/img/avatar.png"
          alt=""
        />
      </button>
      <div
        class="
          opacity-0
          invisible
          dropdown-menu
          transition-all
          duration-300
          transform
          origin-top-right
          -translate-y-2
          scale-95
        "
      >
        <div
          id="navigation-settings"
          class="
            absolute
            right-0
            mt-2
            origin-top-right
            bg-white
            border border-gray-200
            divide-y divide-gray-100
            rounded-md
            shadow-lg
            outline-none
          "
          aria-labelledby="headlessui-menu-button-1"
          role="menu"
        >
          <div v-if="showLogout" class="px-4 py-3">
            <p class="text-sm leading-5">{{ $t("settings.signedInAs") }}</p>
            <p class="text-sm font-medium leading-5 text-gray-900">
              {{ user.email }}
            </p>
          </div>
          <div
            class="
              px-4
              py-3
              whitespace-no-wrap
              flex flex-nowrap
              items-center
              border-b border-t border-solid border-black-600
            "
          >
            <p>{{ $t("settings.language") }}</p>
            <Button
              v-for="locale in getLocales"
              :key="locale"
              class="btn--small"
              :value="locale"
              :active="isCurrentLocale(locale)"
              @click.native="setLocale(locale)"
              >{{ locale.toUpperCase() }}</Button
            >
          </div>
          <div v-if="showLogout" class="py-1">
            <button
              class="
                text-gray-700
                flex
                items-center
                w-full
                px-4
                py-2
                text-sm
                leading-5
                text-left
                hover:text-green-600
              "
              @click="logout"
            >
              <BaseIcon name="logout" class="w-6 h-6 mr-2" />
              {{ $t("settings.logout") }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    showLogout() {
      return this.$route.name !== "login" && this.$route.name !== "index";
    },
    ...mapGetters(["getLocales", "getLocale"]),
    ...mapGetters({ user: "users/getAuthUserInfos" }),
  },
  methods: {
    setLocale(locale) {
      this.$i18n.locale = locale;
      this.$store.dispatch("setLocaleInterface", this.$i18n.locale);
    },
    isCurrentLocale(locale) {
      return locale === this.$i18n.locale;
    },
    logout() {
      this.$fire.auth.signOut().then(() => {
        this.$store.dispatch("setAuthUser", undefined);
        this.$router.replace("/login");
      });
    },
  },
};
</script>

<style scoped>
.dropdown:focus-within .dropdown-menu {
  opacity: 1;
  transform: translate(0) scale(1);
  visibility: visible;
}
</style>
