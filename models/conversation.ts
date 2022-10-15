import { IModel } from './model'

class Conversation implements IModel {
  id: string = '';
  messages?: Array<string>;
  participants: Array<string> = [];
  unreadFor: Array<string> = [];
  title: string = '';
  img: number = 0;
}

export { Conversation }
