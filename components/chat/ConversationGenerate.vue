<template>
  <div>
    <Button :text="$t('generate')" @click.native="generateConv" />
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
@Component

export default class ConversationGenerate extends Vue {
  generateConv () {
    this.$store.dispatch('conversations/createConversation', {
      id: '',
      participants: ['7HC4ypqlMgb5o9N5vNmo8kvwGZ02', 'bmAaBLtmpHYqHDOH875oVsVNbhV2'],
      title: 'Conversation B',
    })
  }
}
</script>

<style scoped>

</style>
