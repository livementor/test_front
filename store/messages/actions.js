import { firestoreAction } from 'vuexfire'

export default {

  createMessage: firestoreAction(async function ({ bindFirestoreRef }, payload) {
    const ref = this.$fire.firestore.collection('conversations').doc(payload.conversationId).collection('messages').doc()
    payload.message.id = ref.id
    ref.set(payload.message)
    this.commit('conversations/SET_MESSAGE', { conversationId: payload.conversationId, message: ref }, { root: true })
    this.commit('messages/SET_MESSAGES', { conversationId: payload.conversationId, messages: [ref] })
    await bindFirestoreRef(ref.id, ref, { wait: true })
  }),

  fetchMessagesForConversation: firestoreAction(async function ({ bindFirestoreRef }, conversationId) {
    const ref = await this.$fire.firestore.collection('conversations').doc(conversationId).collection('messages').get()
    this.commit('conversations/SET_MESSAGES', { conversationId, messages: ref.docs })
    this.commit('messages/SET_MESSAGES', { conversationId, messages: ref.docs.map(m => m.data()) })
    const messages = ref.docs.map((message) => {
      return bindFirestoreRef(message.id, message.ref, { wait: true })
    })

    await Promise.all(messages)
  }),
}
