import { Message } from '~/domain/models/Message'
import { MessageRepository } from '~/domain/repository/Message'
import { ObjectId } from '~/domain/Identifiable'
import { messageFixtures } from '~/fixtures/messages'
import { ApiMessage } from '~/infrastructure/secondary/api/ApiMessage'

export class MessageFixture implements MessageRepository {
  getMessagesByConversationId(conversationId: ObjectId): Promise<Message[]> {
    const conversationApiMessages = messageFixtures.filter(message => message.id === conversationId)
    const conversationMessages = conversationApiMessages.map(this.fromApiMessage)

    return Promise.resolve(conversationMessages)
  }

  private fromApiMessage(apiMessage: ApiMessage): Message {
    const { id, author, text, createdAt } = apiMessage

    return new Message(id, author, text, createdAt)
  }
}
