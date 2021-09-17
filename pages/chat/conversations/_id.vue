<template>
  <div class="mainContainer">
    <div class="appBar">
      <div>
        <span>Nom :</span>
      </div>
      <div>
        <span>Date :</span>
      </div>
    </div>
    <div class="box">
      <div v-if="currentroot !== 'no route'">
        <div v-for="(message, index) in conversationsMessages(currentroot)" :key="index" class="message-container">
          <p class="author">
            {{ message.author && message.author.name ? message.author.name : 'You' }}
          </p>
          <p>{{ message.text }}</p>
        </div>
      </div>
    </div>
    <div class="messageBox">
      <div class="inputMessage">
        <span><input type="text" placeholder="Votre message"></span>
      </div>
      <div>
        <button>Envoyer</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'

@Component
export default class Conversations extends Vue {
  currentroot = 'no route'
  @Watch('$route')
  onPropertyChanged (value: any, _: any) {
    this.currentroot = value.params.id
  }
}
</script>

<style scoped>
 .mainContainer{
   background-color: green;
   min-height: 100vh;
 }
 .appBar{
   position: sticky;
   border-bottom: 1px solid black;
   width: 100%;
   background-color: red;
   height: 10%
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
