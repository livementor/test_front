import { Store } from 'vuex'
import { vuexfireMutations } from 'vuexfire'
import { Notification } from '~/models/notification'
import { ConversationsState } from '~/store/conversations/state'
import { MessagesState } from '~/store/messages/state'
import { UsersState } from '~/store/users/state'

export interface RootState {
  locale: string
  notification?: Notification
  locales: Array<string>
  conversations?: ConversationsState
  messages?: MessagesState
  users?: UsersState
}

export const state = ():RootState => ({
  locales: ['en', 'fr'],
  locale: 'fr',
  notification: undefined,
})

export const getters = {
  getNotification (state: RootState) {
    return state.notification
  },
}

export const mutations = {
  ...vuexfireMutations,
  SET_NOTIFICATION: (state: RootState, notification?: Notification) => {
    state.notification = notification
  },
}

export const actions = {
  showNotification (store: Store<RootState>, notification: Notification) {
    store.commit('SET_NOTIFICATION', notification)
  },
  hideNotification (store: Store<RootState>) {
    store.commit('SET_NOTIFICATION', undefined)
  },
}
