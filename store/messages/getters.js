import _ from 'lodash'

export default {
  getMessagesForConversation: (state, __, rootState) => (
    conversationId,
  ) => {
    if (conversationId === undefined) {
      return null
    }
    const conversation = rootState.conversations[conversationId]
    return _.orderBy(
      Object.values(_.pick(state, conversation?.messages)),
      ['created_at'],
      ['asc'],
    )
  },
}
