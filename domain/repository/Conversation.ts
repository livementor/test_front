import { Conversation } from '~/domain/models/Conversation'
import { ObjectId } from '~/domain/Identifiable'

export interface ConversationRepository {
  getUserConversations: (userId: ObjectId) => Promise<Conversation[]>
}
