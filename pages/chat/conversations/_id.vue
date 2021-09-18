<template>
  <div class="mainContainer">
    <div class="appBar">
      <p>{{ $t('chat.appBar') + idAuthor }}</p>
    </div>
    <div v-if="messages" class="boxContainer">
      <div v-for="(el, index) in messages" :key="index" class="message-container">
        <div :class="el.author === $fire.auth.currentUser.uid ? 'message-container-auth' : 'message-container-user'">
          <p>{{ el.text }}</p>
        </div>
        <div :class="el.author === $fire.auth.currentUser.uid ? 'containerDateAuth' : 'containerDate'">
          <p><em>{{ convertDate(el.createdAt) }}</em></p>
        </div>
      </div>
    </div>
    <div class="messageBox bg-blue-livementor">
      <div class="inputMessage">
        <span><input v-model="currentMessage" type="text" :placeholder="$t('chat.placeholderMessage')"></span>
      </div>
      <div>
        <Button :text="$t('chat.sendButton')" @click.native="sendMessage" />
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
  idAuthor = ''

  @Watch('$route.params.id', { immediate: true })
  onPropertyChanged (id: any, _: any) {
    this.fetchMessages(id)
  }

  fetchMessages (id) {
    if (id !== null && id !== undefined && id !== '') {
      this.$store.dispatch('messages/fetchMessagesForConversation', id)
        .then(
          () => {
            this.messages = this.getMessages(id).sort((a, b) => a.createdAt > b.createdAt)
            this.currentMessage = ''
            this.idAuthor = this.getMessages(id).map(el => el.author).filter(el => el !== this.$fire.auth.currentUser.uid).toString()
          },
        )
    }
  }

  convertDate (date) {
    return moment(date).calendar()
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
   margin-bottom: 100px;
 }
 .appBar{
   width: 100%;
   height: 50px;
   border-bottom: 1px solid lightgrey;
   display: flex;
   justify-content: center;
   align-items: center;
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
   width: max-content;
   max-width: 50%;
   padding: 20px;
 }
 .message-container-auth p{
   color: white;
 }
 .message-container-user{
   background-color: #e5e5ea;
   border-radius: 30px 30px 30px 30px;
   padding: 20px;
   width: max-content;
   max-width: 50%;
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
 .containerDate p{
   color: lightgrey;
   text-align: left;
 }
 .containerDateAuth p{
   text-align: right;
   color: lightgrey;

 }
 span {
   display: block;
   overflow: hidden;
   padding-right:10px;
   height: 100%;
 }
</style>
