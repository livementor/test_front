import Vue from 'vue'
import _ from 'lodash'

export default {
  SET_MESSAGES: (state, payload) => {
    const messages = _.keyBy(payload.messages, 'id')

    Vue.set(state, { ...state, ...messages })
  },
}
