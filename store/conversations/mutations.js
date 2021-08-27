import Vue from 'vue'

export default {
  SET_MESSAGE: (state, payload) => {
    state[payload.conversationId] = state[payload.conversationId] || {}
    state[payload.conversationId].messages = [...(state[payload.conversationId].messages || []), payload.message.id]
  },
  SET_MESSAGES: (state, payload) => {
    state[payload.conversationId].messages = [...(state[payload.conversationId].messages || []), ...payload.messages.map((m) => { return m.id })]
  },
  SET_CONVERSATION: (state, payload) => {
    Vue.set(state, payload.id, payload.conversation)
  },
  CREATE_CONVERSATION: (state, payload) => {
    const { conversation, ref, currentUser } = payload
    conversation.participants = [currentUser, 'bmAaBLtmpHYqHDOH875oVsVNbhV2']
    conversation.id = ref.id
    ref.set(conversation)
    Vue.set(state, conversation.id, conversation)
  },
}
