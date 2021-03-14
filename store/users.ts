import { ObjectId } from '~/domain/Identifiable'

export const state = () => {
  return {
    userId: undefined,
  }
}

export const getters = {
  userId: (state: any) => state.userId,
}

export const mutations = {
  SET_AUTH_USER(state: any, userId: ObjectId) {
    state.userId = userId
  },

  LOGOUT(state: any) {
    delete state[state.userId]
    state.userId = undefined
  },
}

export const actions = {
  setUserId({ commit }: any, userId: ObjectId) {
    localStorage.setItem('userId', userId) // fake push to firebase

    commit('SET_AUTH_USER', userId)
  },

  logout({ commit }: any) {
    localStorage.removeItem('userId') // fake push to firebase
    // @todo: remove store's conversations and messages

    commit('LOGOUT')
  },
}
