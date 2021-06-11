<template>
  <div>
      <message-list :conversation-id="$route.params.id" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import MessageList from '~/components/messages/messageList.vue'

@Component
export default class Conversations extends Vue {
  components = { MessageList }
  currentroot = 'no route'
  @Watch('$route')
  onPropertyChanged (value: any, _: any) {
    this.currentroot = value.params.id
  }
}
</script>
