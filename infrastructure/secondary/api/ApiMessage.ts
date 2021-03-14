export class ApiMessage {
  constructor(
    public readonly id: string,
    public readonly conversationId: string,
    public readonly author: string,
    public readonly text: string,
    public readonly createdAt: Date,
  ) {}
}
