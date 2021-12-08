/* eslint-disable @typescript-eslint/no-unused-vars */
import { addDoc, collection } from '@firebase/firestore';
import { Button, Input } from '@mui/material';
import { serverTimestamp } from 'firebase/firestore';
import { Message, useMessages } from 'modules/chat';
import { db, RootState } from 'modules/redux-store';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const SendMessage: React.FC = ({}) => {
  const { sendMessageToFirestore } = useMessages();
  const [msg, setMsg] = useState('');
  const sendMessage = async (event: React.FormEvent) => {
    event.preventDefault();
    sendMessageToFirestore(msg);
  };
  return (
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
  );
};
