<template>
  <div>
    <Conversation :conversationId="$route.params.id" />
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
