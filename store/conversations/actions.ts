import { Conversation } from '~/models/conversation'
import { ActionContext } from '~/models/store'
import { SET_CONVERSATION, SET_CREATE_CONVERSATION } from '~/store/types/mutations-types'

export default {
  createConversation ({ commit, dispatch } : ActionContext, conversation : Conversation) {
    if (!(this as any).$fire.auth.currentUser) {
      return
    }
    const ref = (this as any).$fire.firestore.collection('conversations').doc()

    dispatch(
      'messages/createMessage',
      {
        conversationId: ref.id,
        message: { author: 'bmAaBLtmpHYqHDOH875oVsVNbhV2', text: 'Bonjour', img: 45 },
      },
      { root: true },
    )

    dispatch(
      'messages/createMessage',
      {
        conversationId: ref.id,
        message: { author: (this as any).$fire.auth.currentUser.uid, text: 'Bonjour', img: 13 },
      },
      { root: true },
    )
    commit(SET_CREATE_CONVERSATION, {
      conversation,
      participants: [(this as any).$fire.auth.currentUser.uid, 'bmAaBLtmpHYqHDOH875oVsVNbhV2'],
      ref,
    })
  },

  async fetchConversations ({ commit } : ActionContext) {
    const ref = await (this as any).$fire.firestore.collection('conversations').get()

    ref.docs.forEach((conversation: any) => {
      commit(SET_CONVERSATION, {
        id: conversation.id,
        conversation: conversation.data(),
      })
    })
  },

  async fetchConversationsForCurrentUser ({ commit } : ActionContext) {
    if (!(this as any).$fire.auth.currentUser) {
      return
    }
    const ref = await (this as any).$fire.firestore
      .collection('conversations')
      .where('participants', 'array-contains', (this as any).$fire.auth.currentUser.uid)
      .get()

    ref.docs.forEach((conversation: any) => {
      commit(SET_CONVERSATION, {
        id: conversation.id,
        conversation: conversation.data(),
      })
    })
  },

  async deleteConversationsForId (_: any, id: string) {
    await (this as any).$fire.firestore.collection('conversations').doc(id).delete()
  },
}
