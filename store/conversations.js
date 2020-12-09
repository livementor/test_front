import Vue from 'vue'
import { firestoreAction } from 'vuexfire'

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
  createConversation: firestoreAction(async function ({ bindFirestoreRef }, conversation) {
    if (!this.$fire.auth.currentUser) {
      return
    }
    const ref = this.$fire.firestore.collection('conversations').doc()
    conversation.participants = [this.$fire.auth.currentUser.uid, 'bmAaBLtmpHYqHDOH875oVsVNbhV2']
    conversation.id = ref.id
    ref.set(conversation)

    this.dispatch('messages/createMessage', { conversationId: ref.id, message: { author: 'bmAaBLtmpHYqHDOH875oVsVNbhV2', text: 'Bonjour' } }, { root: true })
    this.dispatch('messages/createMessage', { conversationId: ref.id, message: { author: this.$fire.auth.currentUser.uid, text: 'Bonjour' } }, { root: true })
    this.commit('conversations/SET_CONVERSATION', { id: ref.id, conversation: ref })
    await bindFirestoreRef(ref.id, ref, { wait: true })
  }),

  fetchConversations: firestoreAction(async function ({ bindFirestoreRef }) {
    const ref = await this.$fire.firestore.collection('conversations').get()
    const conversations = ref.docs.map((conversation) => {
      this.commit('conversations/SET_CONVERSATION', { id: conversation.id, conversation: conversation.data() })
      return bindFirestoreRef(conversation.id, conversation.ref, { wait: true })
    })
    await Promise.all(conversations)
  }),

  fetchConversationsForCurrentUser: firestoreAction(async function ({ bindFirestoreRef }) {
    if (!this.$fire.auth.currentUser) {
      return
    }
    const ref = await this.$fire.firestore.collection('conversations').where('participants', 'array-contains', this.$fire.auth.currentUser.uid).get()
    const conversations = ref.docs.map((conversation) => {
      this.commit('conversations/SET_CONVERSATION', { id: conversation.id, conversation: conversation.data() })
      return bindFirestoreRef(conversation.id, conversation.ref, { wait: true })
    })
    await Promise.all(conversations)
  }),
}

export const getters = {
  getConversations: (state) => {
    return state
  },

}
