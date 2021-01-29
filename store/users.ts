import Vue from 'vue'
import { NotificationType } from '@/models/notification'
import { User } from '../models/user'

export const state = () => ({
  authUser: undefined,
})

export const getters = {
}

export const mutations = {
  ON_AUTH_STATE_CHANGED_MUTATION (state: any, ctx: any) {
    if (ctx.authUser) {
      const { uid, email, displayName, photoURL } = ctx.authUser
      const user = new User(uid, 'username', displayName || 'name', email || '', photoURL || 'avatar_url')
      Vue.set(state, user.id, user)
    }
  },
  SET_USER (state: any, user: User) {
    Vue.set(state, user.id, user)
  },

  CREATE_USER (state: any, payload: any) {
    const { ref, user } = payload
    ref.set(user)
    Vue.set(state, user.uid, user)
  },
  LOGOUT_USER (state: any) {
    delete state[state.authUser]
    state.authUser = undefined
  },
}

export const actions = {

  async onAuthStateChangedAction (store: any, ctx: any) {
    if (!process.client) {
      return
    }
    if (ctx.authUser === null) {
      store.commit('LOGOUT_USER')
      return
    }
    if (!ctx.authUser) {
      store.dispatch('showNotification', { message: 'No user connected', type: NotificationType.ERROR }, { root: true })
    }
    const { uid, email, displayName, photoURL } = ctx.authUser
    store.dispatch('setAuthUser', uid, { root: true })
    const doc = await (this as any).$fire.firestore.collection('users').doc(uid).get()

    if (!doc.exists) {
      store.dispatch('conversations/createConversation', { title: 'Conversation' }, { root: true })
      store.commit('CREATE_USER', { ref: doc.ref, user: { uid, email, displayName, photoURL } })
    }
  },
}
