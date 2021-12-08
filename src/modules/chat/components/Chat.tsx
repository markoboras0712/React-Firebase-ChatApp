/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
import { collection, Timestamp } from '@firebase/firestore';
import { limit, onSnapshot, orderBy, query } from 'firebase/firestore';
import { SignOut } from 'modules/authentication';
import { fetchMessages, setMessagesListener, useMessages } from 'modules/chat';
import { SendMessage } from 'modules/chat/components/SendMessage';
import { db, RootState } from 'modules/redux-store';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
interface Message {
  createdAt?: Timestamp;
  text: string;
  uid: string;
  userName: string;
  userPhoto: string;
}
export const Chat: React.FC = ({}) => {
  const [msg, setMsg] = useState<Message[]>([]);
  const messages = useSelector((state: RootState) => state.messages);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setMessagesListener());
  }, []);
  return (
    <div>
      <SignOut />
      <div>
        {messages.allMessages.map(({ text, userPhoto, userName }) => (
          <div key={Math.random()}>
            <img src={userPhoto as string} />
            <p>{userName}</p>
            <p>{text}</p>
          </div>
        ))}
      </div>
      <SendMessage />
    </div>
  );
};
