import Vue from 'vue'
import { NotificationType } from '@/models/notification'
import { User } from '../models/user'

export const state = () => ({
  authUser: undefined,
})

export const getters = {
  getUserById: (state: any) => (id: string) => {
    return state[id]
  },
}

export const mutations = {
  ON_AUTH_STATE_CHANGED_MUTATION (state: any, ctx: any) {
    if (ctx.authUser) {
      const { uid, email, displayName, photoURL } = ctx.authUser
      const user: User = new User(uid, 'username', displayName || 'name', email || '', photoURL || 'avatar_url')
      state.authUser = user.id
      Vue.set(state, user.id, user)
    }
  },
  SET_USER (state: any, { user }: { user: User }) {
    Vue.set(state, user.id, user)
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
    const { uid, email, displayName, photoURL } = ctx.authUser
    const doc = await (this as any).$fire.firestore.collection('users').doc(uid).get()
    if (!doc.exists) {
      store.dispatch('conversations/createConversation', { title: 'Conversation' }, { root: true })
      doc.ref.set({ uid, email, displayName, photoURL })
    }
  },
  async fetchUsers (store: any) {
    const ref = await (this as any).$fire.firestore.collection('users').get()
    ref.docs.forEach((userFire: any) => {
      const { uid, email, displayName, photoURL } = userFire.data()
      const user: User = new User(uid, 'username', displayName || 'name', email || '', photoURL || 'avatar_url')
      store.commit('SET_USER', { user })
    })
  },
}
