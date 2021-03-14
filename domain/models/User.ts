import { Identifiable, ObjectId } from '~/domain/Identifiable'

export type UserProperties = {
  id?: ObjectId
  username?: string
  name?: string
  email: string
  avatar?: string
}

export class User implements Identifiable {
  constructor(
    public readonly id: ObjectId,
    public readonly username: string,
    public readonly name: string,
    public readonly email: string,
    public readonly avatar: string,
  ) {}

  static fromProperties(userProperties: UserProperties) {
    const id = userProperties.id || 'currentUserUuid'
    const username = userProperties.username || 'current user'
    const name = userProperties.name || 'user fullname'
    const { email } = userProperties
    const avatar = userProperties.avatar || 'https://randomuser.me/api/portraits/men/22.jpg'

    return new User(id, username, name, email, avatar)
  }
}
