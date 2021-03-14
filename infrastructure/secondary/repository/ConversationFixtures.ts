import { ObjectId } from '~/domain/Identifiable'
import { Conversation } from '~/domain/models/Conversation'
import { ConversationRepository } from '~/domain/repository/Conversation'
import { MessageRepository } from '~/domain/repository/Message'
import { conversationFixtures } from '~/fixtures/conversations'
import { ApiConversation } from '~/infrastructure/secondary/api/ApiConversation'

export class ConversationFixtures implements ConversationRepository {
  constructor(private readonly messageRepository: MessageRepository) {}

  async getUserConversations(userId: ObjectId): Promise<Conversation[]> {
    const userApiConversations = this.getUserApiConversations(userId)
    const conversationPromises = userApiConversations.map(this.fromApiConversation)

    return await Promise.all(conversationPromises)
  }

  // fake api call for user's conversations
  private getUserApiConversations(userId: ObjectId): ApiConversation[] {
    const userApiConversations = conversationFixtures.filter(conversation => {
      return conversation.participants.includes(userId)
    })

    return userApiConversations
  }

  private fromApiConversation = async (apiConversation: ApiConversation): Promise<Conversation> => {
    const { id, participants, title } = apiConversation
    const messages = await this.messageRepository.getMessagesByConversationId(id)
    const massagesId = messages.map(message => message.id)
    const conversation = new Conversation(id, title, participants, massagesId)

    return Promise.resolve(conversation)
  }
}
