export default {

  createMessage (_, payload) {
    const ref = this.$fire.firestore.collection('conversations').doc(payload.conversationId).collection('messages').doc()
    payload.message.id = ref.id
    payload.message.createdAt = Date.now()
    ref.set(payload.message)
    this.commit('conversations/SET_MESSAGE', { conversationId: payload.conversationId, message: payload.message }, { root: true })
    this.commit('messages/SET_MESSAGES', { conversationId: payload.conversationId, messages: [payload.message] })
  },

  async fetchMessagesForConversation (_, conversationId) {
    const ref = await this.$fire.firestore.collection('conversations').doc(conversationId).collection('messages').get()
    this.commit('conversations/SET_MESSAGES', { conversationId, messages: ref.docs })
    this.commit('messages/SET_MESSAGES', { messages: ref.docs.map(m => m.data()) })
  },

}
