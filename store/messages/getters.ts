import _ from 'lodash'
import { Conversation } from '~/models/conversation'
import { RootState } from '~/store'
import { MessagesState } from '~/store/messages/state'

export default {
  getMessagesForConversation: (state: MessagesState, __: unknown, rootState: RootState) => (conversationId: string) => {
    if (conversationId === undefined) {
      return null
    }
    const conversation: Conversation | undefined = rootState.conversations?.[conversationId]
    if (conversation?.messages) {
      return _.orderBy(
        Object.values(_.pick(state, conversation.messages)),
        ['created_at'],
        ['asc'],
      )
    }
    return []
  },
  getMessageById: (state: MessagesState) => (id: string) => {
    return state[id]
  },
}
