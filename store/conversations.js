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
  createConversation (_, conversation) {
    if (!this.$fire.auth.currentUser) {
      return
    }
    const ref = this.$fire.firestore.collection('conversations').doc()
    conversation.participants = [this.$fire.auth.currentUser.uid, 'bmAaBLtmpHYqHDOH875oVsVNbhV2']
    conversation.id = ref.id
    ref.set(conversation)

    this.commit('conversations/SET_CONVERSATION', { id: ref.id, conversation })
    this.dispatch('users/fetchUser', 'bmAaBLtmpHYqHDOH875oVsVNbhV2', { root: true })
    this.dispatch('messages/createMessage', { conversationId: ref.id, message: { author: 'bmAaBLtmpHYqHDOH875oVsVNbhV2', text: 'Bonjour' } }, { root: true })
    this.dispatch('messages/createMessage', { conversationId: ref.id, message: { author: this.$fire.auth.currentUser.uid, text: 'Bonjour' } }, { root: true })
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
    const recipientIds = ref.docs.map((conversation) => {
      return conversation.data().participants.filter(participant => participant !== this.$fire.auth.currentUser.uid)[0]
    })
    if (recipientIds.length > 0) {
      this.dispatch('users/fetchUsers', [...new Set(recipientIds)], { root: true })
    }
    ref.docs.forEach((conversation) => {
      this.commit('conversations/SET_CONVERSATION', { id: conversation.id, conversation: conversation.data() })
    })
  },
}

export const getters = {
  getConversations: (state) => {
    return state
  },
  getConversationById: state => (id) => {
    return state[id]
  },
}
