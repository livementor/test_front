<template>
  <div class="bg-fixed"
       style="background-image: url(/chat_wallpaper_1920x1080.png)"
  >
    <div id="messages"
         class="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
    >
      <MessageCard v-for="(message, index) in messages"
                   :key="index"
                   :message="message"
                   :isRightSide="false"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import { Message } from '~/models/message'

@Component
export default class Conversations extends Vue {
  @Getter('messages/getMessagesForConversation') getMessages: any

  messages: Array<Message> = []

  currentroot = 'no route'

  @Watch('$route.params.id', { immediate: true })
  onIdParamChanged (id: any, _: any) {
    this.currentroot = id

    if (id !== null && id !== undefined && id !== '') {
      this.$store.dispatch('messages/fetchMessagesForConversation', id)
        .then(
          () => {
            this.messages = this.getMessages(id)
          },
        )
    }
  }
}
</script>
