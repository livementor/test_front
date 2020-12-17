<template>
  <div>
    <div class="p-4 overflow-y-auto" style="height: calc(100% - 86px)">
      <span v-if="group">
        <div v-for="{day, messages } in group" :key="day">
          <small class="block text-gray-500 text-center font-bold">{{ day }}</small>
          <Message v-for="message in messages" :key="message.createdAt" :message="message" />
        </div>
      </span>
    </div>
    <div id="input-message" style="padding: 20px" class="border-t-2">
      <div class="flex items-center">
        <div class="flex items-center">
          <svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#0b7bfe">
            <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
            <path stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 11h4m-2-2v4" />
          </svg>
        </div>
        <div style="position: relative; flex: 1">
          <input id="message-input" v-model="value" style="width: calc(100% - 32px); position: relative" class="ml-4 mr-4 bg-gray-200 rounded-full px-4 py-2 outline-none" placeholder="Message.." type="text" @keypress.enter="sendMessage">
          <div style="position: absolute; top: 50%; right: 20px; transform: translateY(-50%)">
            <svg style="height: 35px" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#0b7bfe" @click="openEmoji = !openEmoji">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div style="position: absolute; bottom: 100%; right: 0">
              <VEmojiPicker v-if="openEmoji" @select="selectEmoji" />
            </div>
          </div>
        </div>
        <div class="flex items-center">
          <svg style="cursor: pointer" class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" transform="rotate(90)" viewBox="0 0 20 20" fill="#0b7bfe" @click="sendMessage">
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import dayjs from 'dayjs'
import { VEmojiPicker } from 'v-emoji-picker'
import Message from '~/components/chat/Message.vue'

require('dayjs/locale/fr')
dayjs.locale('fr')

@Component({
  components: {
    Message,
    VEmojiPicker,
  },
})
export default class Conversations extends Vue {
  @Watch('$route')
  async onPropertyChanged () {
    await this.fetchMessages()
  }

  value = ''

  openEmoji = false

  async mounted () {
    await this.fetchMessages()
  }

  selectEmoji (emoji: any) {
    this.value += ' ' + emoji.data + ' '
    this.openEmoji = false
    const input = document.getElementById('message-input')
    if (!input) { return }
    input.focus()
  }

  async fetchMessages () {
    await this.$store.dispatch('messages/fetchMessagesForConversation', this.conversationId)
  }

  get conversationId () {
    return this.$route.params.id
  }

  async sendMessage () {
    if (!this.value.length) { return }
    await this.$store.dispatch('messages/createMessage', { message: { text: this.value }, conversationId: this.conversationId })
    this.value = ''
  }

  get group () {
    const messages = this.$store.getters['messages/getMessagesForConversation'](this.conversationId)
    if (!messages) { return [] }
    return Object.entries(messages.reduce((acc: any, message: any) => {
      const date = dayjs(message.createdAt).format('MM/DD/YYYY')
      return {
        [date]: acc[date] ? [...acc[date], message] : [message],
      }
    }, {})).map(([day, messages]) => ({ day: dayjs(day).format('dddd DD MMMM'), messages: (messages as any).sort((a: any, b: any) => a.createdAt - b.createdAt) }))
  }
}
</script>

<style>
#message-input {
  width: calc(100% - 32px);
  outline: none;
  border-radius: 100px;
  padding: 10px 15px;
  background-color: #edf2f7;
  border: none;
}
</style>
