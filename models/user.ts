import { IModel } from './model'

class User implements IModel {
  id: string = '';
  username: string;
  name: string;
  email: string;
  avatar: string;

  constructor (
    id: string,
    username: string,
    name: string,
    email: string,
    avatar: string,
  ) {
    this.id = id
    this.username = username
    this.email = email
    this.name = name
    this.avatar = avatar
  }
}

export { User }
