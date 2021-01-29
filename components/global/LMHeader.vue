<template>
  <div class="flex h-16 bg-blue-livementor w-full items-center">
    <span class="text-center font-bold text-white text-24 m-auto">
      {{ $t('header.company') }}
    </span>
    <Button v-if="showLogout" :text="$t('header.logout')" class="absolute right-0 mr-16" @click.native="logout" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'

@Component
export default class HeaderComponent extends Vue {
  currentRoute = this.$route.name

  @Watch('$route', { immediate: true })
  onPropertyChanged (value: any, _: any) {
    this.currentRoute = value.name
  }

  get showLogout () {
    return this.$route.name !== 'login' && this.$route.name !== 'index'
  }

  logout () {
    this.$fire.auth.signOut().then(() => {
      this.$store.dispatch('setAuthUser', undefined)
      this.$router.replace('/login')
    })
  }
}
</script>
