import classes from './style/MessageLayout.module.css';
import {
  MessageHeader,
  MessageBody,
  MessageFooter,
  useContact,
  useMessages,
  selectAllMessages,
} from 'modules/chat';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from 'modules/users';

export const MessageLayout: React.FC = () => {
  const dispatch = useDispatch();
  const { contact, maxDate } = useContact();
  const messages = useSelector(selectAllMessages);
  const { getMessages, findIdOfChat } = useMessages();

  const idOfChat = findIdOfChat();

  useEffect(() => {
    dispatch(setUser(contact.uid));
    getMessages(idOfChat);
  }, [idOfChat]);

  return (
    <div className={classes.container}>
      <MessageHeader
        uid={contact.uid}
        userName={contact.userName}
        userPhoto={contact.userPhoto}
      />
      {maxDate ? <p className={classes.message__date}>{maxDate}</p> : ''}
      <MessageBody messages={messages} />
      <MessageFooter uid={contact.uid} />
    </div>
  );
};
