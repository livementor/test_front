import _ from 'lodash'

export default {
  getMessagesForConversation: (state, __, rootState) => (
    conversationId,
  ) => {
    if (conversationId === undefined) {
      return null
    }
    const conversation = rootState.conversations[conversationId]
    if (!conversation?.messages) { return null }

    const orderedMessages = _.orderBy(
      Object.values(_.pick(state, conversation.messages)),
      ['created_at'],
      ['asc'],
    )

    return orderedMessages.map(message => ({
      ...message,
      isMine: message.author === rootState.users.user?.id,
    }))
  },
  getMessageById: state => (id) => {
    return state[id]
  },
}
