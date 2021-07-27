import Vue from 'vue'
import { NotificationType } from '@/models/notification'
import { User } from '../models/user'

export const state = () => ({
  authUser: undefined,
})

export const getters = {
  getUserById: (state: any) => (id: any) => {
    return state[id]
  }
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
  SET_USER (state: any, user: User) {
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
  async fetchUser(store: any, userId: string) {
    const doc = await (this as any).$fire.firestore.collection('users').doc(userId).get()
    if (doc.exists) {
      const data = doc.data();
      store.commit("SET_USER", new User(data.uid, data.email, data.displayName, data.email, data.photoURL))
    }
  },
  async fetchUsers(store: any, userIds: string[]) {
    const ref = await (this as any).$fire.firestore.collection('users').where('uid', 'in', userIds).get()
    ref.docs.forEach((user: any) => {
      const data = user.data();
      store.commit('SET_USER', new User(data.uid, data.email, data.displayName, data.email, data.photoURL))
    })
  }
}
