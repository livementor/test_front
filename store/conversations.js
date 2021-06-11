import Vue from 'vue'
import { NotificationType } from '@/models/notification'

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
  createConversation (store, conversation) {
    if (!this.$fire.auth.currentUser) {
      return
    }
    try {
      const ref = this.$fire.firestore.collection('conversations').doc()
      conversation.participants = [this.$fire.auth.currentUser.uid, 'bmAaBLtmpHYqHDOH875oVsVNbhV2']
      conversation.id = ref.id
      ref.set(conversation)
      this.dispatch('messages/createMessage', { conversationId: ref.id, message: { author: 'bmAaBLtmpHYqHDOH875oVsVNbhV2', text: 'Bonjour' } }, { root: true })
      this.dispatch('messages/createMessage', { conversationId: ref.id, message: { author: this.$fire.auth.currentUser.uid, text: 'Bonjour' } }, { root: true })
      this.commit('conversations/SET_CONVERSATION', { id: ref.id, conversation: ref })
    } catch (error) {
      store.dispatch('showNotification', { message: error, type: NotificationType.ERROR }, { root: true })
    }
  },

  async fetchConversations (store) {
    try {
      const ref = await this.$fire.firestore.collection('conversations').get()
      ref.docs.forEach((conversation) => {
        this.commit('conversations/SET_CONVERSATION', { id: conversation.id, conversation: conversation.data() })
      })
    } catch (error) {
      store.dispatch('showNotification', { message: error, type: NotificationType.ERROR }, { root: true })
    }
  },

  async fetchConversationsForCurrentUser (store) {
    if (!this.$fire.auth.currentUser) {
      return
    }
    try {
      const ref = await this.$fire.firestore.collection('conversations').where('participants', 'array-contains', this.$fire.auth.currentUser.uid).get()
      ref.docs.forEach((conversation) => {
        this.commit('conversations/SET_CONVERSATION', { id: conversation.id, conversation: conversation.data() })
      })
    } catch (error) {
      store.dispatch('showNotification', { message: error, type: NotificationType.ERROR }, { root: true })
    }
  },
}

export const getters = {
  getConversations: (state) => {
    return state
  },
  getConversation: (state) => {
    return (conversationId) => {
      return state[conversationId]
    }
  },
}
