<template>
  <div ref="container" class="conversation_container">
    <div class="conversation_bar p-2 d-flex flex-row bg-white">
      <img src="https://picsum.photos/45" alt="avatar" class="avatar">
      <div class="pl-2">
        <p class="text-secondary">
          Nom
        </p>
        <p class="font-bold">
          ""
        </p>
      </div>
    </div>
    <!-- MESSAGE -->
    <div class="messages_and_form p-3">
      <div v-if="messages && messages != []">
        <div
          v-for="message in messages"
          :key="message.createdAt"
          class="message_container"
        >
          <div
            :class="
              message.author === $fire.auth.currentUser.uid ? 'float-right' : ''
            "
          >
            <div
              class="message_date text-secondary"
              :class="
                message.author === $fire.auth.currentUser.uid
                  ? 'text-right'
                  : ''
              "
            >
              {{ formatDate(message.createdAt) }}
            </div>
            <p
              class="pb-1"
              :class="
                message.author === $fire.auth.currentUser.uid
                  ? 'text-right'
                  : ''
              "
            />
            <div
              class="text_card text-white shadow-sm d-inline-block"
              :class="
                message.author === $fire.auth.currentUser.uid
                  ? 'sender float-right'
                  : 'recipient'
              "
            >
              <p>
                {{ message.text }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <p>No messages in this convo yet !</p>
      </div>
    </div>
    <!-- FORM -->
    <div class="input-group p-2">
      <input
        ref="messageInput"
        v-model="currentMessage"
        type="text"
        class="form-control"
        :placeholder="$t('chat.msgPlaceholder')"
        @keyup.enter="sendMessage"
      >
      <button
        type="button"
        class="btn btn-outline-primary"
        @click="sendMessage"
      >
        {{ $t("chat.sendBtn") }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import moment from 'moment'

@Component
export default class Conversations extends Vue {
  @Getter('messages/getMessagesForConversation') getMessagesForConversation: any;
  messages: any = [];
  currentroot: string = 'no route';
  currentMessage: string = '';

  @Watch('$route.params.id', { immediate: true }) onPropertyChange (value: any, _: any) {
    this.currentroot = value
    this.fetchMessages()
  }

  fetchMessages () {
    this.$store
      .dispatch('messages/fetchMessagesForConversation', this.$route.params.id)
      .then(() => {
        this.messages = this.getMessagesForConversation(
          this.$route.params.id,
        ).sort(
          (a: { createdAt: number }, b: { createdAt: number }) =>
            a.createdAt > b.createdAt,
        )
      })
  }

  formatDate (date: moment.MomentInput) {
    return moment(date).format('MMM Do - HH:mm')
  }

  sendMessage () {
    if (this.currentMessage !== '' && this.$fire.auth.currentUser) {
      this.$store
        .dispatch('messages/createMessage', {
          conversationId: this.currentroot,
          message: {
            id: this.$fire.auth.currentUser.uid,
            text: this.currentMessage,
            createdAt: Date.now(),
            author: this.$fire.auth.currentUser.uid,
          },
        })
        .then(() => {
          this.fetchMessages()
          this.currentMessage = '' // Resetting input after send
        })
    }
  }
}
</script>

<style scoped>
.conversation_container {
  background: #ececec;
}

.avatar {
  height: 45px;
  width: 45px;
  border-radius: 50%;
}

.messages_and_form {
  height: calc(100% - 124px);
  overflow-y: scroll;
}

.message_container {
  min-height: 75px;
}
.message_date {
  font-size: 70%;
}
.text_card {
  border-radius: 25px;
  padding: 5px 15px 5px 15px;
}

.inputMessage {
  background: none;
  color: white;
  border-bottom: 1px solid white;
  padding: 0;
}

  .sender {
    background: #4FC1B5;
  }
 .recipient {
   background: #4184DF;
 }
</style>
