<template>
  <div>
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
  onPropertyChanged (updatedRoute: any) {
    this.currentroot = updatedRoute.params.id
  }
}
</script>
