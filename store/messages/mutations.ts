import Vue from 'vue'
import { Message } from '~/models/message'
import { MessagesState } from '~/store/messages/state'

export default {
  SET_MESSAGES: (state: MessagesState, payload: { messages: Message[] }) => {
    payload.messages.forEach(message => Vue.set(state, message.id, message))
  },
}
