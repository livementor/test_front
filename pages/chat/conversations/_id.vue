<template>
  <div class="w-2/3 flex flex-col">
    <ConversationHeader/>
    <ConversationContainerMessage />
    <ConversationInput />
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
