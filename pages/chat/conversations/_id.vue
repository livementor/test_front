<template>
  <div class="mainContainer">
    <div v-if="messages" class="boxContainer">
      <div v-for="(el, index) in messages" :key="index" class="message-container">
        <div :class="el.author === $fire.auth.currentUser.uid ? 'message-container-auth' : 'message-container-user' ">
          <p v-if="el.author && el.text" class="author">
            {{ el.author === $fire.auth.currentUser.uid ? 'moi' : el.author }} - {{ convertDate(el.createdAt) }}
          </p>
          <p>{{ el.text }}</p>
        </div>
      </div>
    </div>
    <div class="messageBox bg-blue-livementor">
      <div class="inputMessage">
        <span><input v-model="currentMessage" type="text" placeholder="Votre message"></span>
      </div>
      <div class="sendButton">
        <Button :text="$t('Envoyer')" @click.native="sendMessage" />
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
  currentMessage = ''

  @Watch('$route.params.id', { immediate: true })
  onPropertyChanged (id: any, _: any) {
    this.fetchMessages(id)
  }

  fetchMessages (id) {
    if (id !== null && id !== undefined && id !== '') {
      this.$store.dispatch('messages/fetchMessagesForConversation', id)
        .then(
          () => {
            this.messages = this.getMessages(id)
            this.currentMessage = ''
          },
        )
    }
  }

  convertDate (date) {
    return moment(date).format('llll')
  }

  sendMessage () {
    if (this.currentMessage !== '') {
      this.$store.dispatch('messages/createMessage',
        {
          conversationId: this.$route.params.id,
          message: {
            id: this.$fire.auth.currentUser.uid,
            text: this.currentMessage,
            author: this.$fire.auth.currentUser.uid,
          },
        }).then(() => this.fetchMessages(this.$route.params.id))
    }
  }
}
</script>

<style scoped lang="css">
 .mainContainer{
   min-height: 100vh;
   background-color: white;
   border-left: 1px solid lightgrey;

 }
 .boxContainer{
   padding: 10px;
 }
 .messageBox{
   height: 10%;
   position: fixed;
   bottom: 0;
   width: 100%;
   display: flex;
   align-items: center;
 }
 .message-container{
   width: 100%;
   padding: 10px;
 }
 .message-container-auth{
   background-color: #248bf5;
   border-radius: 30px 30px 30px 30px;
   margin-left: auto;
   width: 50%;
   padding: 20px;
 }
 .message-container-auth p{
   color: white;
 }
 .message-container-user{
   background-color: #e5e5ea;
   border-radius: 30px 30px 30px 30px;
   padding: 20px;
   width: 50%;
 }
 input{
   width: 100%;
   height: 100%;
 }
 .inputMessage{
   width: 50%;
   height: 100%;
   padding: 15px;
 }
 .sendButton{
   position: relative;
   right:0;
 }
 span {
   display: block;
   overflow: hidden;
   padding-right:10px;
   height: 100%;
 }
</style>
