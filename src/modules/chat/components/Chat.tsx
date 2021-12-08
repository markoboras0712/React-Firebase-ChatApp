/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
import { collection, Timestamp } from '@firebase/firestore';
import { limit, onSnapshot, orderBy, query } from 'firebase/firestore';
import { SignOut } from 'modules/authentication';
import { SendMessage } from 'modules/chat/components/SendMessage';
import { useMessages } from 'modules/chat/hooks/useMessages';
import { setMessagesListener } from 'modules/chat/redux/chatActions';
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
  const { getMessages } = useMessages();
  useEffect(getMessages, []);
  const messages = useSelector(
    (state: RootState) => state.messages.allMessages,
  );

  return (
    <div>
      <SignOut />
      <div>
        {messages.map(({ text, userPhoto, userName }) => (
          <div key={Math.random()}>
            <img src={userPhoto as string} />
            <p>{userName}</p>
            <p>{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
