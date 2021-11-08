<template>
  <div>
    <div v-for="conversation in conversations" :key="conversation.id">
      <NuxtLink
        :to="`/chat/conversations/${conversation.id}`"
      >
        <div class="conversation_cont">
          <div
            class="conversation_item p-2 d-flex flex-row"
            :class=" $route.params.id === conversation.id ? 'active' : ''"
          >
            <img class="avatar" src="https://picsum.photos/50/" alt="avatar">
            <div class="ml-2 col-6 col-md-9 col-lg-9">
              <div
                v-for="participant in conversation.participants"
                :key="participant"
              >
                <div v-if="participant !== $fire.auth.currentUser.uid">
                  <div class="font-bold text-truncate">
                    Nom
                  </div>
                </div>
              </div>
              <div v-for="lastMsg in convosMsgs" :key="lastMsg.id">
                <p v-if="lastMsg.id === conversation.id" class="text-secondary text-truncate">
                  "{{ lastMsg.lastMsg }}"
                </p>
              </div>
            </div>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Getter } from 'vuex-class'

@Component
export default class ConversationList extends Vue {
  @Getter('conversations/getConversations') getConversations: any;
  @Getter('messages/getMessagesForConversation') getMessages: any;

  get conversations () {
    if (!this.$fire.auth.currentUser) {
      return []
    }
    return this.getConversations
  }

  get messages () {
    if (!this.$fire.auth.currentUser) {
      return []
    }
    return this.getMessages
  }

  @Watch('conversations', { immediate: true })
  onChange (_: any) {
    this.fetchLastMessages()
  }

  comboObj: any = {}
  convosMsgs: any = []
  fetchLastMessages () {
    Object.entries(this.conversations).forEach((conversation: any) => {
      this.$store.dispatch('messages/fetchMessagesForConversation', conversation[0])
        .then(() => {
          this.comboObj = {
            id: conversation[0],
            lastMsg: this.getMessages(conversation[0]).sort((a: { createdAt: number }, b: { createdAt: number }) => b.createdAt > a.createdAt).slice(0)[0].text,
          }
          this.convosMsgs.push(this.comboObj)
        })
    })
  }
}
</script>

<style scoped>
.conversation_item {
  transition: .3s ease;
  transition-delay: .1s ease;
  border-radius: 25px;
  margin: 2%;
}
.conversation_item:hover {
  background: #4fc1b64f;
  transition: .3s ease;
  transition-delay: .1s ease;
  cursor: pointer;
  color: initial;
}
.active {
  background: #4fc1b64f;
}

.avatar {
  height: 50px;
  width: 50px;
  border-radius: 50%;
}
</style>
