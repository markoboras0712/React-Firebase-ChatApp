/* eslint-disable @typescript-eslint/no-unused-vars */
import classes from './style/MessageFooter.module.css';
import { ReactComponent as Smiley } from 'assets/smiley.svg';
import { ReactComponent as Buttons } from 'assets/imgupload.svg';
import { useMessages } from 'modules/chat';
import { useState } from 'react';

interface Props {
  uid?: string | undefined | null;
}

export const MessageFooter: React.FC<Props> = ({ uid }) => {
  console.log('Kome saljem', uid);
  const { sendMessageToFirestore } = useMessages();
  const [msg, setMsg] = useState('');
  const sendMessage = async (event: React.FormEvent) => {
    event.preventDefault();
    sendMessageToFirestore(msg, uid as string);
  };
  return (
    <div className={classes.sticky}>
      <hr className={classes.horizontal_line} />
      <form onSubmit={sendMessage}>
        <div className={classes.footer}>
          <button className={classes.footer__smiley}>
            <Smiley />
          </button>

          <input
            type="text"
            placeholder="Type a message"
            onChange={(e) => setMsg(e.target.value)}
            className={classes.footer__input}
          />
          <button className={classes.footer__imgbuttons}>
            <Buttons />
          </button>
        </div>
      </form>
    </div>
  );
};
