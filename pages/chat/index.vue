<template>
  <div>
    <p
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
      {{ $t("chat.noConversation") }}
    </p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  head() {
    return {
      title: "Chat - Livementor",
    };
  },
})
export default class ChatRoot extends Vue {}
</script>
