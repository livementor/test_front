<template>
  <div v-if="conversation" class="flex flex-col bg-gray-100">
    <div class="flex items-center bg-white w-full px-4 py-3 border-b">
      <avatar :user="recipient" />
      <p class="ml-4">{{ recipient ? recipient.name : "" }}</p>
    </div>
    <div class="flex flex-col flex-auto py-2ß">
      <div
        :class="{ 'flex-row-reverse': message.author === currentUserId }"
        class="w-full px-4 py-2 flex"
        :key="message.id"
        v-for="message in messages"
      >
        <div class="mt-1">
          <avatar
            :user="message.author === currentUserId ? currentUser : recipient"
          />
        </div>
        <div class="mx-2 shadow-sm rounded-md p-4 bg-white max-w-sm">
          <p class="whitespace-pre">{{ message.text }}</p>
        </div>
      </div>
    </div>
    <div class="flex items-start bg-white w-full border-t p-4 gap-x-4">
      <textarea
        v-model="message"
        class="flex-grow px-4 py-3 border rounded"
        :placeholder="$t('chat.messagePlaceholder')"
      >
      </textarea>
      <button
        @click="sendClicked"
        :disabled="!message"
        class="btn btn-primary"
      >
        Envoyer
      </button>
    </div>
  </div>
</template>

<script >
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      message: "",
    };
  },
  mounted() {
    this.$store.dispatch(
      "messages/fetchMessagesForConversation",
      this.$route.params.id
    );
  },
  computed: {
    ...mapGetters({
      getMessages: "messages/getMessagesForConversation",
      getConversationById: "conversations/getConversationById",
      getUserById: "users/getUserById",
    }),
    messages() {
      return this.getMessages(this.$route.params.id);
    },
    conversation() {
      return this.getConversationById(this.$route.params.id);
    },
    recipient() {
      if (!this.conversation) {
        return null;
      }
      const recipientId = this.conversation.participants.filter(
        (participant) => participant !== this.$fire.auth.currentUser?.uid
      )[0];
      return this.getUserById(recipientId);
    },
    currentUserId() {
      return this.$fire.auth.currentUser?.uid;
    },
    currentUser() {
      return this.getUserById("authUser");
    },
  },
  methods: {
    sendClicked() {
      if (this.message) {
        this.$store.dispatch("messages/createMessage", {
          conversationId: this.$route.params.id,
          message: { text: this.message, author: this.currentUserId },
        });
        this.message = "";
      }
    },
  },
};
</script>
