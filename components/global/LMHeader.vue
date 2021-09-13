<template>
  <div>
    <v-app-bar color="#f7c948">
      <v-toolbar-title class="pl-6">
        <v-img
          id="logo"
          contain
          max-height="60px"
          class="ml-n2"
          eager
          :src="logoUrl"
        />
      </v-toolbar-title>

      <v-spacer />

      <v-btn
        tile
        elevation="0"
        class="menu-button"
        @click.native="logout"
      >
        <v-icon class="mr-2">
          mdi-logout
        </v-icon>
        {{ $t('header.logout') }}
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'

@Component
export default class HeaderComponent extends Vue {
  currentRoute = this.$route.name;
  logoUrl: string = 'https://www.livementor.com/wp-content/uploads/2020/05/logo-livementor.png';

  @Watch('$route', { immediate: true })
  onPropertyChanged (value: any, _: any) {
    this.currentRoute = value.name
  }

  get showLogout () {
    return this.$route.name !== 'login' && this.$route.name !== 'index'
  }

  logout () {
    this.$fire.auth.signOut().then(() => {
      this.$router.replace('/login')
    })
  }
}
</script>

<style lang="scss">
.menu-button {
  background-color: $color-main !important;
  font-family: $font-main;
}
</style>
