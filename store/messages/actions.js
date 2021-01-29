export default {

  createMessage (_, payload) {
    const ref = this.$fire.firestore.collection('conversations').doc(payload.conversationId).collection('messages').doc()

    this.commit('conversations/SET_MESSAGE', { conversationId: payload.conversationId, messageRef: ref, message: payload.message }, { root: true })
    this.commit('messages/CREATE_MESSAGE', { message: payload.message, ref })
  },

  async fetchMessagesForConversation (_, conversationId) {
    const ref = await this.$fire.firestore.collection('conversations').doc(conversationId).collection('messages').get()
    this.commit('conversations/SET_MESSAGES', { conversationId, messages: ref.docs }, { root: true })
    this.commit('messages/SET_MESSAGES', { messages: ref.docs.map(m => m.data()) })
  },
}
