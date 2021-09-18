<template>
  <div class="mainContainer">
    <div class="box">
      <div v-if="messages">
        <div v-for="(message, index) in messages" :key="index" class="message-container">
          <p class="author">
            {{ message.author }} - {{ convertDate(message.createdAt) }}
          </p>
          <p>{{ message.text }}</p>
        </div>
      </div>
    </div>
    <div class="messageBox">
      <div class="inputMessage">
        <span><input v-model="currentMessage" type="text" placeholder="Votre message"></span>
      </div>
      <div>
        <button @click="sendMessage()">
          Envoyer
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import moment from 'moment'
moment.locale('fr')

@Component
export default class Conversations extends Vue {
  @Getter('messages/getMessagesForConversation') getMessages: any

  messages = []
  currentroot = 'no route'
  currentMessage = ''

  convertDate (date) {
    return moment(date).format('llll')
  }

  sendMessage () {
    if (this.currentMessage !== '') {
      this.$store.dispatch('messages/createMessage',
        {
          conversationId: this.currentroot,
          message: {
            id: this.$fire.auth.currentUser.uid,
            text: this.currentMessage,
            createdAt: Date.now(),
            author: this.$fire.auth.currentUser.uid,
          },
        }).then(() => this.fetchMessages())
    }
  }

  @Watch('$route', { immediate: true })
  onPropertyChanged (value: any, _: any) {
    this.currentroot = value.params.id
    this.messages = []
    this.currentMessage = ''
    this.fetchMessages()
  }

  fetchMessages () {
    if (this.currentroot !== null && this.currentroot !== undefined && this.currentroot !== '') {
      this.$store.dispatch('messages/fetchMessagesForConversation', this.currentroot)
        .then(
          () => {
            this.messages = this.getMessages(this.currentroot)
          },
        )
    }
  }
}
</script>

<style scoped>
 .mainContainer{
   background-color: green;
   min-height: 100vh;
 }
 .box{
   height: 80%;
   background-color: blue;
   flex: 1
 }
 .messageBox{
   height: 5%;
   background-color: purple;
   position: fixed;
   bottom: 0;
   width: 100%;
   display: flex;
   align-items: center;
 }
 input{
   width: 100%;
   height: 100%;
 }
 .inputMessage{
   width: 50%;
   height: 100%
 }
 span {
   display: block;
   overflow: hidden;
   padding-right:10px;
   height: 100%;
 }
 button{
   background-color: yellow;
   padding: 5%;
   border-radius: 10px;

 }
</style>
