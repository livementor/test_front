import { ApiConversation } from '~/infrastructure/secondary/api/ApiConversation'

export const conversationFixtures: ApiConversation[] = [
  {
    id: '12345',
    participants: ['12345', 'currentUserUuid'],
    title: 'Première conversation',
  },
  {
    id: '54321',
    participants: ['54321', 'currentUserUuid'],
    title: 'Hello World!',
  },
]
