import { Trips } from "./Trips";

export default interface Conversation {
  id: string;
  trip: Trips;
  createdAt: Date;
  updatedAt: Date;
  lastMessage: {
    message: string;
    sentAt: Date;
    isMe: boolean;
    isRead: boolean;
  };
}

export interface ConvrsationMessage {
  message: string;
  id: string;
  senderId: string;
  sender: {
    name: string;
    id: string;
    image?: string;
  };
  sendAt: Date;
  isRead: boolean;
  isMe : boolean
}
