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
  CREATE_CONVERSATION: (state, payload) => {
    const { conversation, ref, currentUser } = payload
    conversation.participants = [currentUser, 'bmAaBLtmpHYqHDOH875oVsVNbhV2']
    conversation.id = ref.id
    ref.set(conversation)
    Vue.set(state, conversation.id, conversation)
  },
}

export const actions = {
  createConversation (store, conversation) {
    if (!this.$fire.auth.currentUser) {
      return
    }
    const ref = this.$fire.firestore.collection('conversations').doc()
    store.commit('CREATE_CONVERSATION', { ref, conversation, currentUser: this.$fire.auth.currentUser.uid })
    this.dispatch('messages/createMessage', { conversationId: ref.id, message: { author: 'bmAaBLtmpHYqHDOH875oVsVNbhV2', text: 'Bonjour' } }, { root: true })
    this.dispatch('messages/createMessage', { conversationId: ref.id, message: { author: this.$fire.auth.currentUser.uid, text: 'Bonjour' } }, { root: true })
  },

  async fetchConversations (store) {
    const ref = await this.$fire.firestore.collection('conversations').get()

    ref.docs.forEach((conversation) => {
      store.commit('SET_CONVERSATION', { id: conversation.id, conversation: conversation.data() })
    })
  },

  async fetchConversationsForCurrentUser (store) {
    if (!this.$fire.auth.currentUser) {
      return
    }
    const ref = await this.$fire.firestore.collection('conversations').where('participants', 'array-contains', this.$fire.auth.currentUser.uid).get()

    ref.docs.forEach((conversation) => {
      store.commit('SET_CONVERSATION', { id: conversation.id, conversation: conversation.data() })
    })
  },
}

export const getters = {
  getConversations: (state) => {
    return state
  },

}
