import Vue from 'vue'

export default {
  SET_MESSAGES: (state, payload) => {
    payload.messages.forEach((m) => {
      Vue.set(state, m.id, m)
    })
  },
}
