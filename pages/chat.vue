<template>
  <div :class="['flex', 'h-screen', 'pt-16', '-mt-16']">
    <div
      v-if="!isNotRouteDiscussionOrChatMobileBehavior"
      class="
        w-full
        md:w-1/4 md:border-r md:border-gray-600 md:border-solid
        max-w-full
      "
    >
      <h2
        class="
          font-bold
          text-24
          p-2
          pl-2
          md:pl-10
          h-16
          flex
          items-center
          border-b border-gray-300 border-solid
        "
      >
        {{ $t("chat.title") }}
      </h2>
      <ConversationList />
    </div>
    <NuxtChild
      class="flex w-full md:w-3/4 relative flex-col"
      v-if="!isRouteDiscussionOrChatMobileBehavior"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { State } from "vuex-class";

@Component({
  head() {
    return {
      title: "Chat - Livementor",
    };
  },
})
export default class Chat extends Vue {
  @State("windowParams") windowParams: any;

  @Watch("$store.state.authUser", { immediate: true })
  onChange(value: any) {
    if (value !== null && value !== undefined && value !== "") {
      this.$store.dispatch("conversations/fetchConversationsForCurrentUser");
    }
  }

  get isRouteDiscussionOrChatMobileBehavior() {
    return (
      (this.$route.name === "chat-conversations" ||
        this.$route.name === "chat") &&
      this.windowParams.width <= 767
    );
  }

  get isNotRouteDiscussionOrChatMobileBehavior() {
    return (
      this.$route.name !== "chat-conversations" &&
      this.$route.name !== "chat" &&
      this.windowParams.width <= 767
    );
  }
}
</script>
