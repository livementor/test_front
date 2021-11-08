import { IModel } from './model'

class Message implements IModel {
  id: string;
  createdAt: Date;
  author: string;
  text: string;

  constructor (id: string, createdAt: Date, author: string, text: string) {
    this.id = id
    this.createdAt = createdAt
    this.author = author
    this.text = text
  }
}

export { Message }
