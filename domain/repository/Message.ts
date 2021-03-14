import { Message } from '~/domain/models/Message'
import { ObjectId } from '~/domain/Identifiable'

export interface MessageRepository {
  getMessagesByConversationId: (id: ObjectId) => Promise<Message[]>
}
