import { selectUser } from 'modules/authentication';
import { Message, setMessagesListener, sendMsg } from 'modules/chat';
import { useDispatch, useSelector } from 'react-redux';

export const useMessages = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const sendMessageToFirestore = async (msg: string, to: string) => {
    const message: Message = {
      text: msg,
      to: to,
      uid: user.id as string,
      userName: user.displayName,
      userPhoto: user.userPhoto,
    };
    await dispatch(sendMsg(message));
  };

  const getMessages = () => {
    dispatch(setMessagesListener());
  };

  return {
    sendMessageToFirestore,
    getMessages,
  };
};
