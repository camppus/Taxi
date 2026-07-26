export interface NotificationPayload {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
  createdAt: Date;
}

export interface NotificationProvider {
  publish(notification: NotificationPayload): Promise<void>;
}
