import { NotificationType } from '@/models/notification'
export default {

  async createMessage (store, payload) {
    try {
      const ref = await this.$fire.firestore.collection('conversations').doc(payload.conversationId).collection('messages').doc()
      payload.message.id = ref.id
      payload.message.createdAt = Date.now()
      ref.set(payload.message)
    } catch (error) {
      store.dispatch('showNotification', { message: error, type: NotificationType.ERROR }, { root: true })
    }
  },

  async fetchMessagesForConversation (store, conversationId) {
    try {
      const ref = await this.$fire.firestore.collection('conversations').doc(conversationId).collection('messages').get()
      this.commit('conversations/SET_MESSAGES', { conversationId, messages: ref.docs })
      this.commit('messages/SET_MESSAGES', { messages: ref.docs.map(m => m.data()) })
    } catch (error) {
      store.dispatch('showNotification', { message: error, type: NotificationType.ERROR }, { root: true })
    }
  },
}
