import Vue from 'vue'
import { Conversation } from '~/models/conversation'
import { Message } from '~/models/message'
import { ConversationsState } from '~/store/conversations/state'

export default {
  SET_CONVERSATION: (state: ConversationsState, payload: { id: string, conversation: Conversation }) => {
    Vue.set(state, payload.id, payload.conversation)
  },
  SET_MESSAGE: (state: ConversationsState, payload: { conversationId: string, message: Message }) => {
    const {
      conversationId,
      message,
    } = payload
    state[conversationId] = state[conversationId] ?? {}
    state[conversationId].messages = [...(state[conversationId].messages ?? []), message.id]
  },
  SET_MESSAGES: (state: ConversationsState, payload: { conversationId: string, messages: Message[] }) => {
    state[payload.conversationId].messages = [...(state[payload.conversationId].messages || []), ...payload.messages.map((m) => {
      return m.id
    })]
  },
}
