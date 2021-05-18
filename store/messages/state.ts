import { Message } from '~/models/message'

export interface MessagesState extends Record<string, Message> {

}

export default (): MessagesState => ({})
