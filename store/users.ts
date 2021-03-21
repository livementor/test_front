import Vue from 'vue'
import { NotificationType } from '@/models/notification'
import { User } from '../models/user'

export const state = () => ({
  authUser: undefined,
  users: new Map<String, User>(),
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
  SET_USER (state: any, user: any) {
    const { uid, email, displayName, photoURL } = user.user
    const newState = { ...state.users }
    newState[uid] = new User(uid, 'username', displayName || 'name', email || '', photoURL || 'avatar_url')
    state.users = newState
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
  async fetchUsers () {
    const ref = await (this as any).$fire.firestore.collection('users').get()

    ref.docs.forEach((user: any) => {
      (this as any).commit('users/SET_USER', { user: user.data() })
    })
  },
}
