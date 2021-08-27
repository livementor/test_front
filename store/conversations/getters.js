
export default {
  getConversations: (state) => {
    return state
  },
  getConversationById: state => (id) => {
    if (
      id === undefined ||
      id === null ||
      id === ''
    ) { return null }
    return state[id]
  },
}
