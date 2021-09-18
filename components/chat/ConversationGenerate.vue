<template>
  <button @click="generateConv">
    <img src="/add.png" width="23" height="23" alt="button_add" title="button_add">
  </button>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
@Component

export default class ConversationGenerate extends Vue {
  generateConv () {
    this.$store.dispatch('conversations/createConversation', {
      participants: ['7HC4ypqlMgb5o9N5vNmo8kvwGZ02', 'bmAaBLtmpHYqHDOH875oVsVNbhV2'],
    })
  }
}
</script>
<style lang="css">
 img:hover{
   background-color: #e5e5ea;
   border-radius: 30px;
 }
</style>
