<template>
  <div class="bg-fixed" style="background-image: url(/chat_wallpaper_1920x1080.png)">
    <span>
      Conversation séléctionné {{ $route.params.id }}
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'

@Component
export default class Conversations extends Vue {
  currentroot = 'no route'
  @Watch('$route')
  onPropertyChanged (value: any, _: any) {
    this.currentroot = value.params.id
  }
}
</script>
