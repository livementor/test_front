import Vue from 'vue'

export default {
  SET_MESSAGES: (state, payload) => {
    payload.messages.forEach((m) => {
      Vue.set(state, m.id, m)
    })
  },
  CREATE_MESSAGE: (state, payload) => {
    const { ref, message } = payload
    message.id = payload.ref.id
    message.createdAt = Date.now()
    ref.set(message)
    Vue.set(state, ref.id, message)
  },
}
