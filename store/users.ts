import { ActionTree, MutationTree } from 'vuex'
import { User } from '../models/user'
import { IRootState } from '.'
import { NotificationType } from '~/models/notification'

interface IUserState {
  user?: User
}

export const state = (): IUserState => ({
  user: undefined,
})

export const mutations: MutationTree<IUserState> = {
  ON_AUTH_STATE_CHANGED_MUTATION(state, payload) {
    const { authUser: user } = payload

    if (user) {
      const { uid, email, displayName, photoURL } = user

      const newUser = new User(
        uid,
        'username',
        displayName || 'name',
        email || '',
        photoURL || 'avatar_url',
      )
      state.user = newUser
    }
  },
  SET_USER(state, user) {
    state.user = user
  },
  LOGOUT_USER(state) {
    state.user = undefined
  },
}

export const actions: ActionTree<IUserState, IRootState> = {
  setAuthUser({ commit }, payload) {
    commit('SET_USER', payload)
  },
  async onAuthStateChangedAction({ commit, dispatch }, payload) {
    if (!process.client) {
      return
    }
    const { authUser: user } = payload

    if (!user) {
      commit('LOGOUT_USER')
      dispatch(
        'showNotification',
        { message: 'No user connected', type: NotificationType.ERROR },
        { root: true },
      )
      return
    }

    const { uid, email, displayName, photoURL } = user
    const doc = await this.$fire.firestore
      .collection('users')
      .doc(uid)
      .get()

    if (!doc.exists) {
      dispatch(
        'conversations/createConversation',
        { title: 'Conversation' },
        { root: true },
      )
      doc.ref.set({ uid, email, displayName, photoURL })
    }
  },
}
