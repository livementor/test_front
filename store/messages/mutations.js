import _ from 'lodash'

export default {
  SET_MESSAGES: (state, payload) => {
    const messages = _.keyBy(payload.messages, 'id')
    state.messages = { ...state.messages, ...messages }
  },
}
