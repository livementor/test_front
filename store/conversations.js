import Vue from 'vue'

export const state = () => ({
})

export const mutations = {
  SET_MESSAGE: (state, payload) => {
    state[payload.conversationId] = state[payload.conversationId] || {}
    state[payload.conversationId].messages = [...(state[payload.conversationId].messages || []), payload.message.id]
  },
  SET_MESSAGES: (state, payload) => {
    state[payload.conversationId].messages = [...(state[payload.conversationId].messages || []), ...payload.messages.map((m) => { return m.id })]
  },
  SET_CONVERSATION: (state, payload) => {
    Vue.set(state, payload.id, payload.conversation)
  },
}

export const actions = {
  async createConversation ({ dispatch, commit, state }) {
    if (!this.$fire.auth.currentUser) {
      return
    }

    const conversationCount = Object.keys(state).length

    try {
      const ref = this.$fire.firestore.collection('conversations').doc()
      await ref.set({
        title: `Conversation: ${conversationCount}`,
        id: ref.id,
        participants: [this.$fire.auth.currentUser.uid, 'bmAaBLtmpHYqHDOH875oVsVNbhV2'],
      })

      await dispatch('messages/createMessage', { conversationId: ref.id, message: { author: 'bmAaBLtmpHYqHDOH875oVsVNbhV2', text: 'Bonjour' } }, { root: true })
      await dispatch('messages/createMessage', { conversationId: ref.id, message: { author: this.$fire.auth.currentUser.uid, text: 'Bonjour' } }, { root: true })
      await commit('conversations/SET_CONVERSATION', { id: ref.id, conversation: ref })
      // this.dispatch('showNotification', { message: 'Conversation created', type: 1 })
    } catch (e) {
      dispatch('showNotification', { message: e.message, type: 0 })
    }
  },

  async fetchConversations () {
    const ref = await this.$fire.firestore.collection('conversations').get()

    ref.docs.forEach((conversation) => {
      this.commit('conversations/SET_CONVERSATION', { id: conversation.id, conversation: conversation.data() })
    })
  },

  async fetchConversationsForCurrentUser () {
    if (!this.$fire.auth.currentUser) {
      return
    }
    const ref = await this.$fire.firestore.collection('conversations').where('participants', 'array-contains', this.$fire.auth.currentUser.uid).get()

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
