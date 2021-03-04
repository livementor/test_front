import { ActionTree, MutationTree } from 'vuex'
import { IRootState } from './index'
import { Message } from '~/models/message'

interface IMessagesState {
  messages: Message[]
}

export const state = (): IMessagesState => ({
  messages: [],
})

export const mutations: MutationTree<IMessagesState> = {
  SET_MESSAGES: (state, payload) => {
    state.messages = payload || []
  },

  ADD_MESSAGE: (state, payload) => {
    state.messages.push(payload)
  },
}

export const actions: ActionTree<IMessagesState, IRootState> = {
  async createMessage({ commit }, payload) {
    const ref = this.$fire.firestore
      .collection('conversations')
      .doc(payload.conversationId)
      .collection('messages')
      .doc()

    payload.message.id = ref.id
    payload.message.createdAt = Date.now()
    await ref.set(payload.message)

    commit('ADD_MESSAGE', payload.message)
  },

  async fetchMessagesForConversation({ commit }, conversationId) {
    const ref = await this.$fire.firestore
      .collection('conversations')
      .doc(conversationId)
      .collection('messages')
      .get()

    commit(
      'conversations/SET_CURRENT_CONVERSATION_ID',
      {
        conversationId,
      },
      { root: true },
    )
    commit(
      'SET_MESSAGES',
      ref.docs.map(m => m.data()),
    )
  },
}
