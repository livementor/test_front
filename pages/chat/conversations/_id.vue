<template>
  <div>
    <span>
      Conversation sélectionnée: {{ $route.params.id }}
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator'

@Component
export default class Conversations extends Vue {
  currentRoot = 'no route'

  @Watch('$route')
  onPropertyChanged (value: any, _: any) {
    this.currentRoot = value.params.id
  }
}
</script>
