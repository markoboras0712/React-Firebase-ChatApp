/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
import { Timestamp } from '@firebase/firestore';
import { useMessages } from 'modules/chat/hooks/useMessages';
import { RootState } from 'modules/redux-store';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export const ChatTest: React.FC = ({}) => {
  const { getMessages } = useMessages();
  useEffect(getMessages, []);
  const messages = useSelector(
    (state: RootState) => state.messages.allMessages,
  );

  return (
    <div>
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
