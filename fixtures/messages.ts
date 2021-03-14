import { ApiMessage } from '~/infrastructure/secondary/api/ApiMessage'

export const messageFixtures: ApiMessage[] = [
  {
    id: '1',
    conversationId: '12345',
    author: '12345',
    text: 'Hello, comment va la vie ?',
    createdAt: new Date('2021-01-09T00:00:00.000Z'),
  },
  {
    id: '2',
    conversationId: '12345',
    author: 'currentUser',
    text: 'Ça va tranquille. Je fais un test technique.',
    createdAt: new Date('2021-01-09T01:00:00.000Z'),
  },
  {
    id: '3',
    conversationId: '54321',
    author: '54321',
    text: 'Bonjour, je suis un message de fixture',
    createdAt: new Date('2021-02-09T00:00:00.000Z'),
  },
  {
    id: '4',
    conversationId: '54321',
    author: 'currentUser',
    text: 'Hello, moi aussi, ça tombe bien',
    createdAt: new Date('2021-02-09T01:00:00.000Z'),
  },
]
