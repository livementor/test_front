<template>
  <div class="p-2 flex items-center md:px-10 bg-gray-200 w-full">
    <BaseInput
      id="message"
      type="text"
      class="w-full mt-3"
      classes="h-16 w-full pr-10"
      v-model="message"
      :placeholder="$t('chat.writeMessage')"
      @keypress.enter="sendMessage"
      ><BaseIcon
        @click.native="sendMessage"
        name="arrow-circle-right"
        class="
          mr-2
          absolute
          top-1/2
          transform
          -translate-y-1/2
          right-0
          w-6
          h-6
          cursor-pointer
          fill-current
          text-green-600
          hover:text-green-900
          focus:text-green-900
        "
    /></BaseInput>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Getter } from "vuex-class";

@Component
export default class ConversationInput extends Vue {
  @Getter("users/getAuthUserInfos") user: any;

  message = "";

  sendMessage() {
    this.$store.dispatch(
      "messages/createMessage",
      {
        conversationId: this.$route.params.id,
        message: { author: this.user.id, text: this.message },
      },
      { root: true }
    );

    this.message = "";
  }
}
</script>
