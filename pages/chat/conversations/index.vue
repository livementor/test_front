<template>
  <div class="flex md:w-3/4 relative flex-col">
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
import { Component, Vue } from "vue-property-decorator";

@Component
export default class ConversationRoot extends Vue {}
</script>

<style scoped></style>
