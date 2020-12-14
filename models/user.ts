import { IModel } from './model'

class User implements IModel {
  id: string = '';
  username: string;
  name: string;
  email: string;
  photoURL: string;

  constructor (
    id: string,
    username: string,
    name: string,
    email: string,
    photoURL: string,
  ) {
    this.id = id
    this.username = username
    this.email = email
    this.name = name
    this.photoURL = photoURL
  }
}

export { User }
