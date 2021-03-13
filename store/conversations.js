import Vue from 'vue'

export const state = () => ({})

export const mutations = {
  SET_MESSAGE: (state, payload) => {
    const {
      conversationId,
      message: { id: messageId },
    } = payload
    const storedMessages = state[conversationId].messages || []

    state[conversationId] = state[conversationId] || {}
    state[conversationId].messages = [...storedMessages, messageId]
  },

  SET_MESSAGES: (state, payload) => {
    const { conversationId, messages } = payload
    const storedMessages = state[conversationId].messages || []

    state[conversationId].messages = [
      ...storedMessages,
      ...messages.map((m) => {
        return m.id
      }),
    ]
  },

  SET_CONVERSATION: (state, payload) => {
    const { id, conversation } = payload

    Vue.set(state, id, conversation)
  },
}

export const actions = {
  async createConversation (_, conversation) {
    const { currentUser } = this.$fire.auth
    const ref = await this.$fire.firestore.collection('conversations').doc()

    if (!currentUser) {
      return
    }

    conversation.participants = [currentUser.uid, 'bmAaBLtmpHYqHDOH875oVsVNbhV2']
    conversation.id = ref.id

    ref.set(conversation)

    this.dispatch(
      'messages/createMessage',
      { conversationId: ref.id, message: { author: 'bmAaBLtmpHYqHDOH875oVsVNbhV2', text: 'Bonjour' } },
      { root: true },
    )

    this.dispatch(
      'messages/createMessage',
      { conversationId: ref.id, message: { author: currentUser.uid, text: 'Bonjour' } },
      { root: true },
    )

    this.commit('conversations/SET_CONVERSATION', { id: ref.id, conversation: ref })
  },

  async fetchConversations () {
    const ref = await this.$fire.firestore.collection('conversations').get()

    ref.docs.forEach((conversation) => {
      this.commit('conversations/SET_CONVERSATION', { id: conversation.id, conversation: conversation.data() })
    })
  },

  async fetchConversationsForCurrentUser () {
    const { currentUser } = this.$fire.auth

    if (!currentUser) {
      return
    }

    const ref = await this.$fire.firestore.collection('conversations').where('participants', 'array-contains', currentUser.uid).get()

    ref.docs.forEach((conversation) => {
      this.commit('conversations/SET_CONVERSATION', { id: conversation.id, conversation: conversation.data() })
    })
  },
}

export const getters = {
  getConversations: (state) => {
    return state
  },
}
