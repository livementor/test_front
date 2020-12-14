// TODO: remove function and use export firebase DB in a config module
import { firestoreAction } from 'vuexfire'
import { SET_CONVERSATION_ID, SET_USER } from './mutation-types'

export default {
  bindUserConversations: firestoreAction(async function ({ bindFirestoreRef, dispatch }) {
    // Bind conversations to conversations state property
    const conversationsRef = await this.$fire.firestore
      .collection('baechler_conversations')
      .where('participants', 'array-contains', this.$fire.auth.currentUser.uid)
    const conversations = await bindFirestoreRef('conversations', conversationsRef)
    // Fetch all users in that conversation
    conversations.forEach((conversation) => {
      conversation
        .participants
        .forEach((participant) => {
          if (participant !== this.$fire.auth.currentUser.uid) {
            dispatch('fetchUser', participant)
          }
        })
    })
  }),
  async fetchUser ({ commit }, userId) {
    const user = await this.$fire.firestore
      .collection('baechler_users')
      .doc(userId)
      .get()
    commit(SET_USER, {
      id: user.id,
      data: user.data(),
    })
  },
  openConversation: firestoreAction(async function ({ commit, bindFirestoreRef }, conversationId) {
    commit(SET_CONVERSATION_ID, conversationId)
    const messagesRef = await this.$fire.firestore
      .collection('baechler_conversations')
      .doc(conversationId)
      .collection('messages')
      .orderBy('createdAt', 'asc')
    return bindFirestoreRef('messages', messagesRef)
  }),
}
