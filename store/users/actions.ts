import { Store } from 'vuex'
import { NotificationType } from '~/models/notification'
import { UsersState } from '~/store/users/state'

export default {
  setAuthUser (store: Store<UsersState>, id: string) {
    store.commit('SET_AUTH_USER', id)
  },
  async onAuthStateChangedAction (store: Store<UsersState>, ctx: any) {
    if (!process.client) {
      return
    }

    if (ctx.authUser === null) {
      store.commit('LOGOUT_USER')
      return
    }

    if (!ctx.authUser) {
      await store.dispatch('showNotification', {
        message: 'No user connected',
        type: NotificationType.ERROR,
      }, { root: true })
    }

    const {
      uid,
      email,
      displayName,
      photoURL,
    } = ctx.authUser

    const doc = await (this as any).$fire.firestore.collection('users').doc(uid).get()

    if (!doc.exists) {
      await store.dispatch('conversations/createConversation', { title: 'Conversation' }, { root: true })

      doc.ref.set({
        uid,
        email,
        displayName,
        photoURL,
      })
    }
  },
}
