/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
import { collection, Timestamp } from '@firebase/firestore';
import { limit, onSnapshot, orderBy, query } from 'firebase/firestore';
import { SignOut } from 'modules/authentication';
import { fetchMessages, useMessages } from 'modules/chat';
import { SendMessage } from 'modules/chat/components/SendMessage';
import { db } from 'modules/redux-store';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
interface Message {
  createdAt?: Timestamp;
  text: string;
  uid: string;
  userName: string;
  userPhoto: string;
}
export const Chat: React.FC = ({}) => {
  const [msg, setMsg] = useState<Message[]>([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const messagesRef = collection(db, 'messages');
    const q = query(messagesRef, orderBy('createdAt'), limit(50));
    onSnapshot(q, (snapshot) => {
      let messagesFromFireStore: Message[] = [];
      snapshot.forEach((doc) => {
        messagesFromFireStore.push(doc.data() as Message);
      });
      setMsg(messagesFromFireStore);
    });
    dispatch(fetchMessages());
  }, []);
  return (
    <div>
      <SignOut />
      <div>
        {msg.map(({ text, userPhoto, userName }) => (
          <div key={Math.random()}>
            <img src={userPhoto} />
            <p>{userName}</p>
            <p>{text}</p>
          </div>
        ))}
      </div>
      <SendMessage />
    </div>
  );
};
