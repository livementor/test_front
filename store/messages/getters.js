import _ from "lodash";

export default {
  getMessagesForConversation: (state, __, rootState) => (conversationId) => {
    if (
      conversationId === undefined ||
      rootState.conversations[conversationId] === undefined
    ) {
      return null;
    }
    const conversation = rootState.conversations[conversationId];

    return _.orderBy(
      Object.values(_.pick(state, conversation.messages)),
      ["createdAt"],
      ["asc"]
    );
  },
  getMessageById: (state) => (id) => {
    return state[id];
  },
};
