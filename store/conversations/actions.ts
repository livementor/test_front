import { Store } from 'vuex'
import { Conversation } from '~/models/conversation'
import { ConversationsState } from '~/store/conversations/state'

export default {
  createConversation (store: Store<ConversationsState>, conversation: Conversation) {
    // @ts-ignore
    const currentUser = this.$fire.auth.currentUser
    if (!currentUser) {
      return
    }
    // @ts-ignore
    const ref = this.$fire.firestore.collection('conversations').doc()
    conversation.participants = [currentUser.uid, 'bmAaBLtmpHYqHDOH875oVsVNbhV2']
    conversation.id = ref.id
    ref.set(conversation)

    const messages = [
      {
        conversationId: ref.id,
        message: {
          author: 'bmAaBLtmpHYqHDOH875oVsVNbhV2',
          text: 'Bonjour',
        },
      },
      {
        conversationId: ref.id,
        message: {
          author: currentUser.uid,
          text: 'Bonjour',
        },
      },
    ]

    messages.forEach(message => store.dispatch('messages/createMessage', message, { root: true }))

    store.commit('SET_CONVERSATION', {
      id: ref.id,
      conversation: ref,
    })
  },

  async fetchConversationsForCurrentUser (store: Store<ConversationsState>) {
    // @ts-ignore
    const currentUser = this.$fire.auth.currentUser
    if (!currentUser) {
      return
    }
    // @ts-ignore
    const ref = await this.$fire.firestore.collection('conversations').where('participants', 'array-contains', currentUser.uid).get()

    ref.docs.forEach((conversation: any) => {
      store.commit('SET_CONVERSATION', {
        id: conversation.id,
        conversation: conversation.data(),
      })
    })
  },
}
