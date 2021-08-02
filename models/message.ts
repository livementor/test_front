import { IModel } from './model'

class Message implements IModel {
  id: string;
  createdAt: Date;
  author: string;

  constructor (id: string, createdAt: Date, author: string) {
    this.id = id
    this.createdAt = createdAt
    this.author = author
  }
}

export { Message }
