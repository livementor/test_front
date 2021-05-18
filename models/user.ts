import { FirebaseObject } from './model'

export interface User extends FirebaseObject {
  id: string
  username: string
  name: string
  email: string
  avatar: string
}
