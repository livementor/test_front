<template>
  <div>
    <ConversationDiscussion
      :messages="getMessagesForConversation($route.params.id)"
    />
    <ConversationInput />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { Getter, State } from "vuex-class";

@Component
export default class Conversations extends Vue {
  @State("conversations") conversations: any;
  @Getter("messages/getMessagesForConversation")
  getMessagesForConversation: any;

  currentroot = "no route";
  messages = [];
  @Watch("$route")
  onPropertyChanged(value: any, _: any) {
    this.currentroot = value.params.id;
    this.messages = this.getMessagesForConversation(value.params.id);
  }
}
</script>
