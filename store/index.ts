import { ActionTree, GetterTree, MutationTree } from 'vuex'
import { vuexfireMutations } from 'vuexfire'
import { INotification } from '~/models/notification'

export interface IRootState {
  locale: string
  notification?: INotification
  locales: Array<string>
  conversations?: Map<string, any>
  users?: Map<string, any>
}

export const state = (): IRootState => ({
  locales: ['en', 'fr'],
  locale: 'fr',
  notification: undefined,
})

export const getters: GetterTree<IRootState, IRootState> = {
  getNotification(state: IRootState) {
    return state.notification
  },
}

export const mutations: MutationTree<IRootState> = {
  ...vuexfireMutations,
  SET_NOTIFICATION: (state: IRootState, payload?: INotification) => {
    state.notification = payload
  },
}

export const actions: ActionTree<IRootState, IRootState> = {
  showNotification({ commit }, payload) {
    commit('SET_NOTIFICATION', payload)
  },
  hideNotification({ commit }) {
    commit('SET_NOTIFICATION', undefined)
  },
}
