<template>
  <div>
    <NuxtLink
      :to="`/chat/conversations/${conversation.id}`"
      v-for="conversation in conversationsIds"
      :key="conversation.id"
      :class="[
        'flex border-b',
        'p-2',
        'md:pl-10',
        'md:pb-6',
        'md:pt-6',
        'md:pr-6',
        'bg-white',
        'hover:bg-gray-200',
        'focus:bg-gray-200',
        { 'bg-gray-200': conversation.id === conversationOpened },
      ]"
    >
      <img class="rounded-full h-12 w-12" src="/img/avatar.png" alt="" />
      <div class="ml-2 overflow-hidden">
        <h3 class="text-md truncate">{{ conversation.title }}</h3>
        <p class="text-sm text-gray-600 truncate">
          <span
            v-for="(participant, idx) in conversation.participants"
            :key="participant"
            >{{ idx !== 0 ? ", " : "" }}{{ participant }}</span
          >
        </p>
      </div>
    </NuxtLink>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Getter } from "vuex-class";

@Component
export default class ConversationList extends Vue {
  @Getter("conversations/getConversations") getConversations: any;

  get conversationsIds() {
    if (!this.$fire.auth.currentUser) {
      return [];
    }

    return this.getConversations;
  }

  get conversationOpened() {
    return this.$route.params.id;
  }
}
</script>
