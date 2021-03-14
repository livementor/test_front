import { Identifiable, ObjectId } from '~/domain/Identifiable'

export class Conversation implements Identifiable {
  constructor(
    public readonly id: ObjectId,
    public readonly title: string,
    public readonly participants: ObjectId[],
    public readonly messages: ObjectId[],
  ) {}
}
