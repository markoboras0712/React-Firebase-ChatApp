import { addDoc, collection } from '@firebase/firestore';
import { Button, Input } from '@mui/material';
import { serverTimestamp } from 'firebase/firestore';
import { SignOut } from 'modules/authentication';
import { useMessages } from 'modules/chat';
import { db } from 'modules/redux-store';
import { useState } from 'react';

export const Chat: React.FC = ({}) => {
  const messages = useMessages();
  console.log(messages);
  const [msg, setMsg] = useState('');
  const sendMessage = async (event: React.FormEvent) => {
    event.preventDefault();
    await addDoc(collection(db, 'messages'), {
      createdAt: serverTimestamp(),
      text: msg,
    });
  };
  return (
    <div>
      <SignOut />
      <div>
        {messages.map(({ photoUrl, text }) => (
          <div key={Math.random()}>
            <img src={photoUrl} alt="" />
            <p>{text}</p>
          </div>
        ))}
      </div>
      <div>
        <form onSubmit={sendMessage}>
          <div className="sendMsg">
            <Input
              style={{
                width: '78%',
                fontSize: '15px',
                fontWeight: '550',
                marginLeft: '5px',
                marginBottom: '-3px',
              }}
              placeholder="Message..."
              type="text"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
            />
            <Button
              style={{
                width: '18%',
                fontSize: '15px',
                fontWeight: '550',
                margin: '4px 5% -13px 5%',
                maxWidth: '200px',
              }}
              type="submit"
            >
              Send
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
