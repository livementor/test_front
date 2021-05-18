import { FirebaseObject } from './model'

export interface Conversation extends FirebaseObject {
  id: string
  messages?: Array<string>
  participants: Array<string>
  unreadFor: Array<string>
}
