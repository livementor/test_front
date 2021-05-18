import { Conversation } from '~/models/conversation'

export interface ConversationsState extends Record<string, Conversation> {
}

export default (): ConversationsState => ({})
