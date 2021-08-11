<template>
  <div class="flex h-16 bg-gray-200 w-full items-center">
    <h1
      class="
        font-bold
        text-lg
        md:text-xl
        ml-2
        md:ml-10
        mr-16
        md:mr-0
        hover:text-green-600
        focus:text-green-600
      "
    >
      <n-link to="/">{{ $t("settings.company") }}</n-link>
    </h1>
    <NavigationMain class="absolute right-0 mr-2 md:mr-10" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";

@Component
export default class HeaderComponent extends Vue {
  currentRoute = this.$route.name;

  @Watch("$route", { immediate: true })
  onPropertyChanged(value: any, _: any) {
    this.currentRoute = value.name;
  }
}
</script>
