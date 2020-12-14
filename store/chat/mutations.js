import { SET_CONVERSATION_ID, SET_USER } from './mutation-types'

export default {
  [SET_CONVERSATION_ID]: (state, conversationId) => {
    state.currentConversationId = conversationId
  },
  [SET_USER]: (state, payload) => {
    state.users = {
      ...state.users,
      [payload.id]: payload.data,
    }
  },
}
