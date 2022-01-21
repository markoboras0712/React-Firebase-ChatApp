/* eslint-disable @typescript-eslint/no-unused-vars */
import classes from './style/MessageLayout.module.css';
import {
  MessageHeader,
  MessageBody,
  MessageFooter,
  useContact,
  useMessages,
  selectAllMessages,
  clearMessages,
  selectAllMessagesLoading,
  createNewChat,
  NewChat,
} from 'modules/chat';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, setUser } from 'modules/users';
import { useLocation } from '@reach/router';
import { LoadingSpinner } from 'components';
import { saveUser, selectUser } from 'modules/authentication';

export const MessageLayout: React.FC = () => {
  const messagesLoading = useSelector(selectAllMessagesLoading);
  const auth = useSelector(selectUser);
  const { getMessages, findIdOfChat } = useMessages();
  const location = useLocation<{ myState: 'value' }>();
  const layoutId = location.state.myState;
  const idOfChat = findIdOfChat(layoutId);

  const dispatch = useDispatch();

  const { maxDate, findUser } = useContact();
  const { userName, userPhoto } = findUser(layoutId);
  const messages = useSelector(selectAllMessages);

  useEffect(() => {
    if (idOfChat) {
      getMessages(idOfChat);
    } else {
      dispatch(clearMessages());
      // const data: NewChat = {
      //   to: layoutId,
      //   uid: auth.id,
      // };
      // dispatch(createNewChat(data));
      // dispatch(saveUser(auth.id));
      // dispatch(fetchUsers());
    }
    // idOfChat ? getMessages(idOfChat) : dispatch(clearMessages());
  }, []);

  if (messagesLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className={classes.container}>
      <MessageHeader uid={layoutId} userName={userName} userPhoto={userPhoto} />
      {maxDate && <p className={classes.message__date}>{maxDate}</p>}
      <MessageBody messages={messages} />
      <MessageFooter uid={layoutId} />
    </div>
  );
};
