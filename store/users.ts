import Vue from 'vue'
import { NotificationType } from '@/models/notification'
import { User } from '../models/user'

export const state = () => ({
  authUser: undefined,
  selectedUser: {},
})

export const getters = {
}

export const mutations = {
  ON_AUTH_STATE_CHANGED_MUTATION (state: any, ctx: any) {
    if (ctx.authUser) {
      const { uid, email, displayName, photoURL } = ctx.authUser
      const user = new User(uid, 'username', displayName || 'name', email || '', photoURL || 'avatar_url')
      state.authUser = user.id
      Vue.set(this, user.id, user)
    }
  },
  SET_USER (user: User) {
    Vue.set(this, user.id, user)
  },
  SET_SELECTED_USER (state: any, user: User) {
    state.selectedUser = user
  },
  SET_AUTH_USER (state: any, id: string) {
    state.authUser = id
  },
  LOGOUT_USER (state: any) {
    delete state[state.authUser]
    state.authUser = undefined
  },
}

export const actions = {
  setAuthUser (store: any, id: string) {
    store.commit('SET_AUTH_USER', id)
  },
  async setSelectedUser (store: any, id: string) {
    try {
      const doc = await (this as any).$fire.firestore.collection('users').doc(id).get()
      store.commit('SET_SELECTED_USER', { ...doc.data() })
    } catch (error) {
      store.dispatch('showNotification', { message: error, type: NotificationType.ERROR }, { root: true })
    }
  },
  async onAuthStateChangedAction (store : any, ctx: any) {
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
    try {
      const { uid, email, displayName, photoURL } = ctx.authUser
      const doc = await (this as any).$fire.firestore.collection('users').doc(uid).get()
      if (!doc.exists) {
        store.dispatch('conversations/createConversation', { title: 'Conversation' }, { root: true })
        doc.ref.set({ uid, email, displayName, photoURL })
      }
    } catch (error) {
      store.dispatch('showNotification', { message: error, type: NotificationType.ERROR }, { root: true })
    }
  },
}
