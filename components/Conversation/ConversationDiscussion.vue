<template>
  <div class="discussion-bg relative overflow-hidden h-full">
    <h2
      class="
        p-2
        h-16
        flex
        items-center
        md:px-10
        border-b
        bg-white
        relative
        z-10
        bg-white
      "
    >
      <n-link class="md:hidden" to="/chat/conversations"
        ><BaseIcon
          name="chevron-left"
          class="
            w-6
            h-6
            mr-2
            hover:text-green-600
            focus:text-green-600
          " /></n-link
      >{{ conversationTitle }}
    </h2>
    <div
      refs="message-container"
      v-if="messages"
      class="
        pl-2
        pr-2
        pb-2
        pt-16
        -mt-16
        md:pl-10 md:pr-10 md:pb-10
        h-full
        overflow-auto
      "
    >
      <ConversationMessage
        v-for="message in messages"
        :key="message.id"
        :message="message"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import { Getter, State } from "vuex-class";

@Component({
  created() {
    this.$store.dispatch(
      "messages/fetchMessagesForConversation",
      this.$route.params.id
    );
  },
  updated() {
    this.$store.dispatch(
      "messages/fetchMessagesForConversation",
      this.$route.params.id
    );
  },
})
export default class ConversationDiscussion extends Vue {
  @Prop() messages?: any;
  @Getter("conversations/getConversations") getConversations: any;
  @State("conversations") conversations: any;

  conversationTitle = "";

  @Watch("conversations", { immediate: true })
  onChange(value: any) {
    if (value[this.conversationOpened]) {
      this.conversationTitle = value[this.conversationOpened].title;
    }
  }

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

<style scoped>
.discussion-bg::before {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  background: url("/img/bg.png") repeat;
  z-index: -1;
}
</style>
