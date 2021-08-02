<template>
  <div class="conversation-list">
    <div v-for="(conv, index) in getConversations" :key="index">
      <NuxtLink :to="`/chat/conversations/${conv.id}`" :class="getClassesLink(conv.id)">
        {{ getNameOfConversation(conv) }}
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

@Component
export default class ConversationList extends Vue {
  @Getter('conversations/getConversations') getConversations:any

  // ** the idea is to replace the name of the conversation by the name of participants
  // ** of the conversation if the name was not overrided (value === 'Conversation')
  getNameOfConversation (conv:any) {
    return conv.title
  }

  getClassesLink (id:string) {
    const classes = ['text-blue-livementor', 'link']
    if (this.$route.params.id === id) {
      classes.push('selected-element')
    }
    return classes
  }
}
</script>

<style>
  .conversation-list {
    background-color: #034035;
    color: white;
    height: 100%;
    margin-top: 15px;
    margin-left: 10px;
    margin-bottom: 10px;
  }

  .conversation-list .link {
    background-color: white;
    color: #034035;
  }

  .conversation-list .link.selected-element {
    background-color: #034035;
    color: white;
  }
</style>
