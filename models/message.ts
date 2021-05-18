import { FirebaseObject } from './model'

export interface Message extends FirebaseObject {
  id: string
  createdAt: number
  author: string
  text: string
}
