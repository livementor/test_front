<template>
  <ul class="divide-y divide-gray-200">
    <li v-for="(conversation, id, index) in conversations" :key="id">
      <NuxtLink :to="`/chat/conversations/${id}`" class="p-4 flex hover:bg-blue-100">
          <img
            class="h-10 w-10 rounded-full"
            :src="`https://randomuser.me/api/portraits/men/${index}.jpg`"
            alt="Photo de profil"
          />
          <div class="ml-3">
            <p class="text-sm font-medium text-gray-900">{{ conversation.title }}</p>
            <p class="text-sm text-gray-500">{{ conversation.participants.length }} participants</p>
          </div>
      </NuxtLink>
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Getter } from "vuex-class";

@Component
export default class ConversationList extends Vue {
  @Getter("conversations/getConversations") getConversations: any;

  get conversations() {
    if (!this.$fire.auth.currentUser) {
      return [];
    }
    return this.getConversations;
  }
}
</script>
