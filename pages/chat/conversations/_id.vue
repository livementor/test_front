<template>
  <ul v-if="messages" class="p-8 space-y-8">
    <li v-for="message in messages" :key="message.id">
      <div
        class="flex space-x-3"
        :class="{ 'justify-end text-right': thisIsMe(message) }"
      >
        <div class="flex-shrink-0">
          <img
            v-if="!thisIsMe(message)"
            class="h-10 w-10 rounded-full"
            src="https://randomuser.me/api/portraits/men/11.jpg"
            alt=""
          />
        </div>
        <div class="p-4 bg-white overflow-hidden shadow rounded-lg">
          <div class="text-sm">
            <a
              v-if="thisIsMe(message)"
              href="#"
              class="font-medium text-gray-900"
              >Jeremy ROBERT</a
            >
            <a v-else href="#" class="font-medium text-gray-900"
              >Alexandre DANA</a
            >
          </div>
          <div class="text-sm space-x-2">
            <span class="text-gray-500 font-medium text-xs">{{
              new Date(message.createdAt).toLocaleString()
            }}</span>
          </div>
          <div class="mt-1 text-sm text-gray-700">
            <p>
              {{ message.text }}
            </p>
          </div>
        </div>
        <img
          v-if="thisIsMe(message)"
          class="h-10 w-10 rounded-full"
          src="https://randomuser.me/api/portraits/men/10.jpg"
          alt=""
        />
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { Action } from "vuex-class";

@Component
export default class Conversations extends Vue {
  currentroot = "no route";

  @Action("messages/fetchMessagesForConversation")
  fetchMessagesForConversation: any;

  @Watch("$route")
  onPropertyChanged(value: any, _: any) {
    this.currentroot = value.params.id;
    this.fetchMessagesForConversation(this.currentroot);
  }

  get messages(): any[] {
    return Object.values(this.$store.state.messages)
      .concat()
      .sort(this.sortBy("createdAt"));
  }

  asyncData() {
    this.fetchMessagesForConversation(this.$route.params.id);
  }

  thisIsMe(message: any) {
    return message.author === this.$store.state.users.authUser;
  }

  sortBy(key) {
    return (a, b) => (a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : 0);
  }
}
</script>
