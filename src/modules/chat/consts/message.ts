export interface Message {
  text?: string;
  uid?: string;
  to?: string;
  userName?: string | undefined | null;
  userPhoto?: string | undefined | null;
}

export interface AllMessages {
  allMessages: Message[];
  message: Message;
  loading: boolean;
  error: string | unknown;
}
