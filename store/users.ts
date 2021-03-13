import Vue from 'vue'
import { NotificationType } from '@/models/notification'
import { User } from '../models/user'

export const state = () => ({
  authUser: undefined,
})

export const getters = {}

export const mutations = {
  ON_AUTH_STATE_CHANGED_MUTATION(state: any, ctx: any) {
    if (!ctx.authUser) {
      return
    }

    const currentUser = ctx.authUser
    const { uid } = currentUser
    const username = 'username'
    const displayName = currentUser.displayName || 'name'
    const email = currentUser.email || ''
    const photoURL = currentUser.photoURL || 'avatar_url'

    const user = new User(uid, username, displayName, email, photoURL)

    state.authUser = user.id
    Vue.set(this, user.id, user)
  },

  SET_USER(user: User) {
    Vue.set(this, user.id, user)
  },

  SET_AUTH_USER(state: any, id: string) {
    state.authUser = id
  },

  LOGOUT_USER(state: any) {
    delete state[state.authUser]
    state.authUser = undefined
  },
}

export const actions = {
  setAuthUser(store: any, id: string) {
    store.commit('SET_AUTH_USER', id)
  },

  async onAuthStateChangedAction(store: any, ctx: any) {
    if (!process.client) {
      return
    }

    if (!ctx.authUser) {
      store.commit('LOGOUT_USER')
      return
    }

    const currentUser = ctx.authUser
    const { uid, email, displayName, photoURL } = currentUser
    const doc = await (this as any).$fire.firestore.collection('users').doc(uid).get()

    if (!currentUser) {
      store.dispatch('showNotification', { message: 'No user connected', type: NotificationType.ERROR }, { root: true })
    }

    if (!doc.exists) {
      store.dispatch('conversations/createConversation', { title: 'Conversation' }, { root: true })
      doc.ref.set({ uid, email, displayName, photoURL })
    }
  },
}
