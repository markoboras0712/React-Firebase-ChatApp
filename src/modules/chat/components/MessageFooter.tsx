import classes from './style/MessageFooter.module.css';
import { ReactComponent as Smiley } from 'assets/smiley.svg';
import { ReactComponent as Buttons } from 'assets/imgupload.svg';
import { ReactComponent as SendButton } from 'assets/send_svg.svg';
import { useMessages } from 'modules/chat';
import { useState } from 'react';
import React from 'react';

interface Props {
  uid: string;
}

export const MessageFooter = React.memo<Props>(({ uid }) => {
  const { sendMsg } = useMessages();
  const [msg, setMsg] = useState('');

  const sendMessage = (event: React.FormEvent) => {
    event.preventDefault();

    sendMsg(msg, uid);
    setMsg('');
  };

  return (
    <div className={classes.sticky}>
      <hr className={classes.horizontal_line} />
      <form onSubmit={sendMessage} className={classes.footer}>
        <button type="button" className={classes.footer__smiley} disabled>
          <Smiley />
        </button>

        <input
          placeholder="Type a message"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          className={classes.footer__input}
        />
        <button
          className={classes.footer__imgbuttons}
          type="submit"
          disabled={!msg}
        >
          {msg.length === 0 ? <Buttons /> : <SendButton />}
        </button>
      </form>
    </div>
  );
});
