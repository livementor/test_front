import Vue from 'vue'
import { NotificationType } from '@/models/notification'
import { User } from '../models/user'

export const state = () => ({
  authUser: undefined,
  users: {},
})

export const getters = {
  getUserById: (state: any) => (id: string) => state.users[id],
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
    Vue.set(state.users, user.id, user)
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
      // @todo: when logout the store should be entirely cleared
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

  async fetchUserById (store : any, uid: string) {
    const ref = await (this as any).$fire.firestore.collection('users').where('uid', '==', uid).get()

    ref.docs.forEach((user: any) => {
      const userData = user.data()
      const newUser = new User(userData.uid, userData.displayName, userData.displayName, userData.email, userData.photoUrl)
      store.commit('SET_USER', newUser)
    })
  },

  async fetchUsersByIds (store : any, uids: string[]) {
    const promises: any[] = []

    uids.forEach((uid) => {
      promises.push(store.dispatch('fetchUserById', uid))
    })

    await Promise.all(promises)
  },
}
