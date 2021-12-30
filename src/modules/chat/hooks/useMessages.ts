import { Message, setMessagesListener, sendMsg } from 'modules/chat';
import { RootState } from 'modules/redux-store';
import { useDispatch, useSelector } from 'react-redux';

export const useMessages = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const sendMessageToFirestore = async (msg: string, to: string) => {
    const message: Message = {
      text: msg,
      to: to,
      uid: user.user.id,
      userName: user.user.displayName,
      userPhoto: user.user.userPhoto,
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
