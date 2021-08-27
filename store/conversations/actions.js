export default {

  createConversation (store, conversation) {
    if (!this.$fire.auth.currentUser) {
      return
    }
    const ref = this.$fire.firestore.collection('conversations').doc()
    store.commit('CREATE_CONVERSATION', { ref, conversation, currentUser: this.$fire.auth.currentUser.uid })
    this.dispatch('messages/createMessage', { conversationId: ref.id, message: { author: 'bmAaBLtmpHYqHDOH875oVsVNbhV2', text: 'Bonjour' } }, { root: true })
    this.dispatch('messages/createMessage', { conversationId: ref.id, message: { author: this.$fire.auth.currentUser.uid, text: 'Bonjour' } }, { root: true })
  },

  async fetchConversations (store) {
    const ref = await this.$fire.firestore.collection('conversations').get()

    ref.docs.forEach((conversation) => {
      store.commit('SET_CONVERSATION', { id: conversation.id, conversation: conversation.data() })
    })
  },

  async fetchConversationsForCurrentUser (store) {
    if (!this.$fire.auth.currentUser) {
      return
    }
    const ref = await this.$fire.firestore.collection('conversations').where('participants', 'array-contains', this.$fire.auth.currentUser.uid).get()

    ref.docs.forEach((conversation) => {
      store.commit('SET_CONVERSATION', { id: conversation.id, conversation: conversation.data() })
    })
  },
}
