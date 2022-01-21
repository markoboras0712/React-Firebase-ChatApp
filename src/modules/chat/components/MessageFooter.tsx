/* eslint-disable @typescript-eslint/no-unused-vars */
import classes from './style/MessageFooter.module.css';
import { ReactComponent as Smiley } from 'assets/smiley.svg';
import { ReactComponent as Buttons } from 'assets/imgupload.svg';
import { ReactComponent as SendButton } from 'assets/send_svg.svg';
import {
  createNewChat,
  Message,
  sendNewMessage,
  useMessages,
} from 'modules/chat';
import { useState } from 'react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveUser, selectUser } from 'modules/authentication';
import { fetchUsers } from 'modules/users';

interface Props {
  uid: string;
}

export const MessageFooter: React.FC<Props> = ({ uid }) => {
  const { findIdOfChat } = useMessages();
  const auth = useSelector(selectUser);
  const dispatch = useDispatch();
  const { sendMsg } = useMessages();
  const [msg, setMsg] = useState('');
  const idOfChat = findIdOfChat(uid);
  console.log('id of chat footer', idOfChat);
  const sendMessage = (event: React.FormEvent) => {
    event.preventDefault();
    if (!idOfChat) {
      const message: Message = {
        text: msg,
        to: uid,
        uid: auth.id,
      };
      dispatch(createNewChat(message));
      dispatch(fetchUsers());
      dispatch(saveUser(auth.id));
      setMsg('');
    } else {
      const message: Message = {
        text: msg,
        to: uid,
        uid: auth.id,
        subCollection: idOfChat,
      };
      dispatch(sendNewMessage(message));
      setMsg('');
    }
    // sendMsg(msg, uid, idOfChat);
    // setMsg('');
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
          {!msg.length ? <Buttons /> : <SendButton />}
        </button>
      </form>
    </div>
  );
};
