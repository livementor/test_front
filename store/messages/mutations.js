import Vue from 'vue'

export default {
  SET_MESSAGES: (state, payload) => {
    Object.keys(state).forEach((k) => {
      delete state[k]
    })
    payload.messages.forEach((m) => {
      Vue.set(state, m.id, m)
    })
  },
}
