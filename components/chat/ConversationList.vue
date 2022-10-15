<template>
  <div>
    <div class="title">
      {{ $t('chat.messages') }}
    </div>
    <div class="conv-container">
      <ul>
        <li v-for="(conversation, index) in conversationsIds" :key="index">
          <NuxtLink :to="`/chat/conversations/${conversation.id}`" class="text-blue-livementor">
            <div class="flex items-center">
              <img
                class="w-10 h-10 rounded-full"
                :src="`https://xsgames.co/randomusers/assets/avatars/male/${conversation.img}.jpg`"
                alt=""
              >
              <div class="text-title">
                {{ conversation.title }}
              </div>
            </div>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

@Component
export default class ConversationList extends Vue {
  @Getter('conversations/getConversations') getConversations:any

  get conversationsIds () {
    if (!this.$fire.auth.currentUser) {
      return []
    }
    return this.getConversations
  }
}
</script>

<style scoped>
  .title {
    font-weight: 500;
    font-size: 1rem;
    padding: 20px 10px;
  }
  .conv-container {
    padding: 6px;
    margin: 16px;
    background: #eee;
    border-radius: 8px;
  }
  .conv-container:hover {
    background: aliceblue;
  }
  .text-thumbnail {
    margin-top: 2px;
    color: gray;
    font-size: 0.65rem;
  }
  .text-title {
    color: black;
    margin-left: 10px;
  }
</style>
