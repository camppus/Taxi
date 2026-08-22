import { User } from "./User";

export enum MessageStatus {
  SENT = "SENT",
  DELIVERED = "DELIVERED",
  READ = "READ",
}

export enum NotificationType {
  SYSTEM = "SYSTEM",
  BOOKING = "BOOKING",
  PAYMENT = "PAYMENT",
  TRIP = "TRIP",
  CHAT = "CHAT",
  REMINDER = "REMINDER",
}

export interface Conversation {
  id: string;
  bookingId: string;
  messages?: Message[];
  createdAt: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  sender: User;
  content: string;
  status: MessageStatus;
  createdAt: string;
}

export interface OTPCode {
  id: string;
  userId: string;
  code: string;
  expiresAt: string;
  used: boolean;
  createdAt: string;
}

// ==========================
// Notification
// ==========================

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  read: boolean;
  createdAt: string;
}
