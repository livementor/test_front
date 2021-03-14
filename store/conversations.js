import { ConversationFixtures } from '~/infrastructure/secondary/repository/ConversationFixtures'
import { MessageFixture } from '~/infrastructure/secondary/repository/MessageFixture'

export const state = () => {
  return {
    conversations: {},
  }
}

export const mutations = {
  SET_MESSAGE: (state, payload) => {
    const {
      conversationId,
      message: { id: messageId },
    } = payload
    const storedMessages = state[conversationId].messages || []

    state[conversationId] = state[conversationId] || {}
    state[conversationId].messages = [...storedMessages, messageId]
  },

  SET_MESSAGES: (state, payload) => {
    const { conversationId, messages } = payload
    const storedMessages = state[conversationId].messages || []

    state[conversationId].messages = [
      ...storedMessages,
      ...messages.map(m => {
        return m.id
      }),
    ]
  },

  SET_CONVERSATION: (state, conversation) => {
    const { id } = conversation

    state.conversations[id] = conversation
  },
}

export const actions = {
  async fetchConversationsForCurrentUser({ commit }, userId) {
    const messageRepository = new MessageFixture()
    const conversationRepository = new ConversationFixtures(messageRepository)
    const conversations = await conversationRepository.getUserConversations(userId)

    conversations.forEach(conversation => {
      commit('SET_CONVERSATION', conversation)
    })
  },
}

export const getters = {
  conversations: state => state.conversations,
  conversionById: state => id => state.conversations.find(conversation => conversation.id === id),
}
