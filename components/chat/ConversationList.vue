<template>
  <div>
    <div v-for="conversation in conversations" :key="conversation.id">
      <NuxtLink :to="`/chat/conversations/${conversation.id}`">
        <div
          :class="{ 'bg-green-200': $route.params.id === conversation.id }"
          class="flex items-center m-2 p-3 hover:bg-green-200 rounded"
        >
          <div>
            <avatar :user="conversation.recipient" />
          </div>
          <div class="ml-4">
            <p class="font-bold">{{ conversation.title }}</p>
            <p class="text-gray-700 text-sm">
              {{ conversation.recipient ? conversation.recipient.name : "" }}
            </p>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      getConversations: "conversations/getConversations",
      getUserById: "users/getUserById",
    }),
    conversations() {
      if (!this.$fire.auth.currentUser) {
        return [];
      }

      return Object.keys(this.getConversations).map((key) => {
        const value = this.getConversations[key];
        const recipientId = value.participants.filter(
          (participant) => participant !== this.$fire.auth.currentUser?.uid
        )[0];
        return { id: key, ...value, recipient: this.getUserById(recipientId) };
      });
    },
  },
};
</script>
