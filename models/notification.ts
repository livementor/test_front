
export enum NotificationType {
  ERROR,
  SUCCESS
}

export interface INotification {
  message: string
  type: NotificationType,
}
