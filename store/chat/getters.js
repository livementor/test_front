import { formatDistance, format } from 'date-fns'
// TODO: move locale management to RootState or in a config module
import { fr } from 'date-fns/locale'

export default {
  conversations: (state, getters, rootState) => {
    /*
    *   Sorting by updatedAt in getter since we don't have access to firestore
    *   TODO: create an index on firestore + chain .orderBy('updatedAt', 'desc')
    *   in bindUserConversations action
    */
    return [...state.conversations]
      .map(conversation => ({
        ...conversation,
        participants: conversation.participants
          .filter(participant => participant !== rootState.users.authUser.id)
          .map(participant => getters.user(participant)),
        timeDistance: (conversation.updatedAt)
          ? formatDistance(new Date(conversation.updatedAt), new Date(), { locale: fr })
          : '',
      }))
      .sort((a, b) => (b.updatedAt - a.updatedAt))
  },
  messages: (state, getters, rootState) => {
    const currentUser = rootState.users.authUser
    const mappedMessages = []
    state.messages.forEach((message, index) => {
      const isCurrentUserAuthor = currentUser.id === message.author
      const isPreviousMessageSender = Boolean(
        state.messages[index - 1] &&
        state.messages[index - 1].author === message.author,
      )
      const dateShouldBeDisplayed = Boolean(
        !state.messages[index - 1] ||
        (
          state.messages[index - 1] &&
          message.createdAt - state.messages[index - 1].createdAt > 3600 * 1000 // 1h
        ),
      )
      const dateFormatString =
        (new Date(message.createdAt).getFullYear() === new Date().getFullYear())
          ? 'cccc dd MMMM, kk:mm'
          : 'dd MMMM yyyy, kk:mm'
      const { id, text } = message
      if (!isPreviousMessageSender || dateShouldBeDisplayed) {
        mappedMessages.push({
          isCurrentUserAuthor,
          dateShouldBeDisplayed,
          date: format(new Date(message.createdAt), dateFormatString, { locale: fr }),
          author: (isCurrentUserAuthor) ? currentUser : getters.user(message.author),
          content: [{ id, text }],
        })
      } else {
        mappedMessages[mappedMessages.length - 1].content.push({ id, text })
      }
    })
    return mappedMessages
  },
  user: state => (id) => {
    return state.users[id] || {}
  },
}
