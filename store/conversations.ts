import { ActionTree, MutationTree } from 'vuex'
import { IRootState } from './'
import { Conversation } from '~/models/conversation'

interface IConversationState {
  conversations: Conversation[]
  currentConversationId?: number
}

export const state = (): IConversationState => ({
  conversations: [],
  currentConversationId: undefined,
})

export const mutations: MutationTree<IConversationState> = {
  SET_CONVERSATIONS(state, conversations) {
    if (!conversations || !conversations.length) {
      return
    }

    state.conversations = conversations
  },

  SET_CURRENT_CONVERSATION_ID: (state, id) => {
    state.currentConversationId = id
  },
}

export const actions: ActionTree<IConversationState, IRootState> = {
  createConversation({ commit, dispatch }, conversation) {
    if (!this.$fire.auth.currentUser) {
      return
    }
    const ref = this.$fire.firestore.collection('conversations').doc()
    conversation.participants = [
      this.$fire.auth.currentUser.uid,
      'bmAaBLtmpHYqHDOH875oVsVNbhV2',
    ]

    conversation.id = ref.id
    ref.set(conversation)

    dispatch(
      'messages/createMessage',
      {
        conversationId: ref.id,
        message: { author: 'bmAaBLtmpHYqHDOH875oVsVNbhV2', text: 'Bonjour' },
      },
      { root: true },
    )
    dispatch(
      'messages/createMessage',
      {
        conversationId: ref.id,
        message: { author: this.$fire.auth.currentUser.uid, text: 'Bonjour' },
      },
      { root: true },
    )
    commit('SET_CONVERSATION', {
      id: ref.id,
      conversation: ref,
    })
  },

  async fetchConversations({ commit }) {
    const ref = await this.$fire.firestore.collection('conversations').get()

    const conversations = ref.docs.map(d => d.data())
    commit('SET_CONVERSATIONS', conversations)
  },

  async fetchConversationsForCurrentUser({ commit }) {
    if (!this.$fire.auth.currentUser) {
      return
    }
    const ref = await this.$fire.firestore
      .collection('conversations')
      .where('participants', 'array-contains', this.$fire.auth.currentUser.uid)
      .get()

    const conversations = ref.docs.map(d => d.data())
    commit('SET_CONVERSATIONS', conversations)
  },
}
