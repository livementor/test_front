import { Identifiable, ObjectId } from '../Identifiable'

export class Message implements Identifiable {
  constructor(
    public readonly id: ObjectId,
    public readonly author: ObjectId,
    public readonly text: string,
    public readonly createdAt: Date = new Date(),
  ) {}
}
