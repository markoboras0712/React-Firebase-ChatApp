import { Timestamp } from 'firebase/firestore';

export interface Message {
  text: string;
  uid: string;
  to: string;
  userName?: string;
  userPhoto?: string;
  createdAt?: Timestamp;
  id?: string;
}

export interface MessageDate {
  text: string;
  uid: string;
  to: string;
  userName?: string;
  userPhoto?: string;
  createdAt?: Date;
  id?: string;
}

export interface AllMessages {
  allMessages: Message[];
  loading: boolean;
  error: string | unknown;
}
