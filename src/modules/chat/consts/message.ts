import { Timestamp } from '@firebase/firestore';

export interface Message {
  createdAt?: Timestamp;
  photoUrl: string;
  text: string;
  uid: string;
}

export interface AllMessages {
  allMessages: Message[];
  message: Message;
  loading: boolean;
  error: string | unknown;
}
