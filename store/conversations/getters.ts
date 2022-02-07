export default {
  getConversations: (state: any) => {
    return state
  },
  getConversationById: (state: any) => (id:string) => {
    return state[id]
  },
}
