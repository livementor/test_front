import orderBy from 'lodash/orderBy'
import pick from 'lodash/pick'

export default {
  getMessagesForConversation: (state, __, rootState) => (
    conversationId,
  ) => {
    if (conversationId === undefined) {
      return null
    }
    const conversation = rootState.conversations[conversationId]

    return orderBy(
      Object.values(pick(state, conversation.messages)),
      ['created_at'],
      ['asc'],
    )
  },
  getMessageById: state => (id) => {
    return state[id]
  },
}
