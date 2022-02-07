import Vue from 'vue'
import { SET_CONVERSATION, SET_CREATE_CONVERSATION, SET_MESSAGE, SET_MESSAGES } from '~/store/types/mutations-types'

export default {
  [SET_MESSAGE]: (state: any, payload: any) => {
    state[payload.conversationId] = state[payload.conversationId] || {}
    state[payload.conversationId].messages = [...(state[payload.conversationId].messages || []), payload.message.id]
  },
  [SET_MESSAGES]: (state:any, payload: any) => {
    state[payload.conversationId].messages = [...(state[payload.conversationId].messages || []), ...payload.messages.map((m: any) => { return m.id })]
  },
  [SET_CONVERSATION]: (state :any, payload: any) => {
    Vue.set(state, payload.id, payload.conversation)
  },
  [SET_CREATE_CONVERSATION]: (state :any, payload: any) => {
    const { conversation, participants, ref } = payload
    conversation.participants = participants
    conversation.id = ref.id
    conversation.img = 13
    ref.set(conversation)
    Vue.set(state, conversation.id, conversation)
  },
}
