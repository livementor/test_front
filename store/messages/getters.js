import _ from 'lodash'

export default {
  getMessagesForConversation: (state, __, rootState) => (
    conversationId,
  ) => {
    if (conversationId === undefined) {
      return null
    }
    const conversation = rootState.conversations[conversationId]
    if (!conversation) {
      return null
    }
    return _.orderBy(
      Object.values(_.pick(state, conversation.messages)),
      ['createdAt'],
      ['asc'],
    )
  },
  getMessageById: state => (id) => {
    return state[id]
  },
}
