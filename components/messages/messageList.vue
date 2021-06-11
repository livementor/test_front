<template>
  <div class="flex-1 p:2 sm:p-6 justify-between flex flex-col">
   <div class="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
      <div class="flex items-center space-x-4">
         <img :src="userPicture" width="50" height="50">
         <div class="flex flex-col leading-tight">
            <div class="text-2xl mt-1 flex items-center">
               <span class="text-gray-700 mr-3">{{selectUser.displayName}}</span>
            </div>
            <span class="text-lg text-gray-600">{{conversation.title}}</span>
         </div>
      </div>
   </div>
   <div id="messages" class="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
      <div v-for="message in messages" :key="message.id" class="chat-message"> 
         <div :class="isMessageAuthUser(message.author) ? 'justify-end':''" class="flex items-end " >
            <div :class="isMessageAuthUser(message.author) ? 'order-1 items-end':'order-2 items-start'" class="flex flex-col space-y-2 text-xs max-w-xs mx-2">
               <div><span :class="isMessageAuthUser(message.author) ? 'rounded-br-none bg-blue-600 text-white':'rounded-bl-none bg-gray-300 text-gray-600'" class="px-4 py-2 rounded-lg inline-block">{{message.text}}</span></div>
            </div>
            <img :class="isMessageAuthUser(message.author) ? 'order-2':'order-1'" :src="defaultPicture" alt="My profile" class="w-6 h-6 rounded-full">
         </div>
         <div :class="isMessageAuthUser(message.author) ? 'justify-end':''" class="flex items-end date">{{getDate(message.createdAt)}}</div>
      </div>
   </div>  
   <div class="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
      <div class="relative flex">
         <span class="absolute inset-y-0 flex items-center">
            <button type="button" class="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6 text-gray-600">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
               </svg>
            </button>
         </span>
         <input v-model="newMessage" type="text" :placeholder="$t('chat.writeSomething')" class="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-full py-3">
         <div class="absolute right-0 items-center inset-y-0 hidden sm:flex">
            <button @click="sendMessage" type="button" class="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none">
               <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-6 w-6 transform rotate-90">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
               </svg>
            </button>
         </div>
      </div>
   </div> 
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  props: {
     conversationId: {
        required: true,
        type: String
     },
  },
  mounted() {
      this.init()
  },
  data() {
      return {
         conversation: {},
         user: {},
         newMessage: '',
         defaultPicture: 'https://img2.freepng.fr/20180509/klq/kisspng-person-logo-computer-icons-5af2c2026fcf79.460327751525858818458.jpg'
      }
  },
  computed: {
     ...mapGetters('conversations', ['getConversation']),
     messages() {
        return Object.values(this.$store.state.messages).sort((a, b) => a.createdAt - b.createdAt)
     },
     authUser() {
        return this.$store.state.users.authUser
     },
     selectUser() {
        return this.$store.state.users.selectedUser
     },
     userPicture() {
        return this.selectUser.photoURL ? this.selectUser.photoURL: this.defaultPicture
     }
  },
  methods: {
     ...mapActions('messages', ['fetchMessagesForConversation']),
     ...mapActions('messages', ['createMessage']),
     ...mapActions('users', ['setSelectedUser']),
     async init() {
        this.newMessage = ''
         await this.fetchMessagesForConversation(this.conversationId)
         this.conversation = this.getConversation(this.conversationId)
         const userId = this.conversation.participants.find(u => u !== this.authUser)
         this.user = await this.setSelectedUser(userId)
     },
     isMessageAuthUser(author) {
        return author === this.authUser
     },
     getDate(createdAt){
        const date = new Date(createdAt)
        return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
     },
     async sendMessage() {
        const payload = { 
           conversationId: this.conversationId, 
           message: { 
              author: this.authUser, 
              text: this.newMessage 
            }
         }
        await this.createMessage(payload)
        this.init()
     }
  },
  watch: {
      conversationId() {
         this.init()
     }
  }
}
</script>

<style scoped>
.scrollbar-w-2::-webkit-scrollbar {
  width: 0.25rem;
  height: 0.25rem;
}

.scrollbar-track-blue-lighter::-webkit-scrollbar-track {
  --bg-opacity: 1;
  background-color: #f7fafc;
  background-color: rgba(247, 250, 252, var(--bg-opacity));
}

.scrollbar-thumb-blue::-webkit-scrollbar-thumb {
  --bg-opacity: 1;
  background-color: #edf2f7;
  background-color: rgba(237, 242, 247, var(--bg-opacity));
}

.scrollbar-thumb-rounded::-webkit-scrollbar-thumb {
  border-radius: 0.25rem;
}
.date {
   font-size: 10px;
}
</style>
