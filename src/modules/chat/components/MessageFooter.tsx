/* eslint-disable @typescript-eslint/no-unused-vars */
import classes from './style/MessageFooter.module.css';
import { ReactComponent as Smiley } from 'assets/smiley.svg';
import { ReactComponent as Buttons } from 'assets/imgupload.svg';
import { ReactComponent as SendButton } from 'assets/send_svg.svg';
import {
  createNewChat,
  createNewChatTest,
  Message,
  sendNewMessage,
  useMessages,
} from 'modules/chat';
import { useEffect, useState } from 'react';
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
  const [msg, setMsg] = useState('');
  const idOfChat = findIdOfChat(uid);
  console.log('id of chat footer', idOfChat);

  useEffect(() => {
    if (!idOfChat) {
      const message: Message = {
        to: uid,
        uid: auth.id,
      };
      dispatch(createNewChatTest(message));
    }
  }, []);

  const sendMessage = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('id of chat u send message', idOfChat);
    const message: Message = {
      text: msg,
      to: uid,
      uid: auth.id,
      subCollection: idOfChat,
    };
    dispatch(sendNewMessage(message));
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
        <button type="submit" disabled={!msg}>
          {!msg.length ? <Buttons /> : <SendButton />}
        </button>
      </form>
    </div>
  );
};
