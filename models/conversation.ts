import { IModel } from './model'

class Conversation implements IModel {
  id: string = '';
  title: string = '';
  messages?: Array<string>;
  participants: Array<string> = [];
  unreadFor: Array<string> = [];
  img: number = 0
}

export { Conversation }
