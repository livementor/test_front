<template>
  <div class="p-6 flex flex-col">
    <div
      v-for="(message, index) in messages" :key="index"
      class="flex flex-row self-start"
      v-bind:class="{'self-end' : $store.state.users.authUser === message.author}"
    >
      <div
        v-if="$store.state.users.authUser !== message.author"
        class="h-12 w-12 rounded-full bg-white mr-4"
      >
      </div>
      <div
        class="p-4 mb-4 bg-white shadow-sm rounded-lg"
        v-bind:class="{'bg-green-100' : $store.state.users.authUser === message.author}"
      >
        <span class="font-semibold">
          {{ message.text }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'

@Component
export default class Conversations extends Vue {
  currentroot = 'no route'

  get messages () {
    return Object.values(this.$store.state.messages.messages).filter(m => m)
  }

  // @Watch('$route')
  // onPropertyChanged (value: any, _: any) {
  //   this.currentroot = value.params.id
  //   this.$store.dispatch('messages/fetchMessagesForConversation')
  // }

  created () {
    this.$store.dispatch('messages/fetchMessagesForConversation', this.$route.params.id)
  }
}
</script>
