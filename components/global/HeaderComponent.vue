<template>
  <header role="navigation" class="header-component flex h-16 w-full items-center">
    <h1 class="header-component__title text-center font-bold m-auto">
      {{ $t('header.company') }}
    </h1>
    <Button v-if="showLogout" :text="$t('header.logout')" class="absolute right-0 mr-8" @click="logout" />
  </header>
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
      this.$router.replace('/login')
    })
  }
}
</script>

<style lang="scss" scoped>
.header-component {
  border-bottom: 0.125rem solid #F2F2F2;

  &__title {
    font-size: 1.8rem;
  }
}
</style>
