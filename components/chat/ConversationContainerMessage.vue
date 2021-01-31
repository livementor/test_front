<template>
  <div class="flex-1 overflow-auto bg-gray-200">
    <div class="py-2 px-3" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import { Message } from '~/models/message'

@Component
export default class ConversationContainerMessage extends Vue {
 @Prop() conversationId!: string;
 @Getter('messages/getMessagesForConversation') getMessagesForConversation!: (conversationId: string) => Message

 mounted () {
     console.log(this.$route.params.id)
     //console.log(this.getMessagesForConversation(this.$route.params.id))
 }
}
</script>
