export enum NotificationType {
  ERROR,
  SUCCESS
}

export interface Notification {
  message: string
  type: NotificationType,
}
