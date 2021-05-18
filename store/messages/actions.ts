import { Store } from 'vuex'
import { Message } from '~/models/message'
import { MessagesState } from '~/store/messages/state'

export default {

  createMessage (store: Store<MessagesState>, payload: { conversationId: string, message: Message }) {
    // @ts-ignore
    const ref = this.$fire.firestore.collection('conversations').doc(payload.conversationId).collection('messages').doc()
    payload.message.id = ref.id
    payload.message.createdAt = Date.now()
    ref.set(payload.message)
    store.commit('conversations/SET_MESSAGE', { conversationId: payload.conversationId, message: ref }, { root: true })
    store.commit('messages/SET_MESSAGES', { conversationId: payload.conversationId, messages: [ref] })
  },

  async fetchMessagesForConversation (store: Store<MessagesState>, conversationId: string) {
    // @ts-ignore
    const messagesRef = await this.$fire.firestore.collection('conversations').doc(conversationId).collection('messages').get()
    store.commit('conversations/SET_MESSAGES', { conversationId, messages: messagesRef.docs })
    store.commit('messages/SET_MESSAGES', { messages: messagesRef.docs.map((message: any) => message.data()) })
  },
}
