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
  createConversation ({ commit, dispatch }, payload) {
    if (!this.$fire.auth.currentUser) {
      return
    }
    const ref = this.$fire.firestore.collection('conversations').doc()
    ref.add({
      ...payload,
      participants: [this.$fire.auth.currentUser.uid, 'bmAaBLtmpHYqHDOH875oVsVNbhV2'],
    })

    dispatch('messages/createMessage', { conversationId: ref.id, message: { author: 'bmAaBLtmpHYqHDOH875oVsVNbhV2', text: 'Bonjour' } }, { root: true })
    dispatch('messages/createMessage', { conversationId: ref.id, message: { author: this.$fire.auth.currentUser.uid, text: 'Bonjour' } }, { root: true })
    commit('conversations/SET_CONVERSATION', { id: ref.id, conversation: ref })
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
