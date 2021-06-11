<template>
  <div class="flex h-16 bg-blue-livementor w-full items-center">
    <span class="text-center font-bold text-white text-24 m-auto">
      {{ $t('header.company') }}
    </span>
    <locale-changer />
    <Button v-if="showLogout" :text="$t('header.logout')" class="absolute right-0 mr-16" @click.native="logout" />
  </div>
</template>

<script>
import LocaleChanger from './LocaleChanger.vue'
export default {
  components: {LocaleChanger},
  data() {
    return {
      currentRoute: this.$route.name
    }
  },
  computed: {
    showLogout () {
      return this.$route.name !== 'login' && this.$route.name !== 'index'
    },
    route() {
      return this.$route
    },
  },
  methods: {
    logout () {
      this.$fire.auth.signOut().then(() => {
        this.$router.replace('/login')
      })
    },
  },
  watch: {
    route :{
      immediate: true,
      handler(value) {
        this.currentRoute = value.name
      }
    }
  }
}
</script>