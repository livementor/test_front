<template>
  <div>
    <span>
      Conversation sélectionnée {{ $route.params.id }}
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'

@Component
export default class Conversations extends Vue {
  currentroot = 'no route'
  @Watch('$route', { immediate: true, deep: true })
  onPropertyChanged (value: any) {
    this.currentroot = value.params.id
  }
}
</script>
