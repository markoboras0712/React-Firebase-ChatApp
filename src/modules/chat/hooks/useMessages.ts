/* eslint-disable @typescript-eslint/no-unused-vars */
import { sendMsg } from 'modules/chat/redux/chatActions';
import { Message, setMessagesListener } from 'modules/chat';
import { RootState } from 'modules/redux-store';
import { useDispatch, useSelector } from 'react-redux';

export const useMessages = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const sendMessageToFirestore = async (msg: string) => {
    const message: Message = {
      text: msg,
      uid: user.userData.id,
      userName: user.userData.displayName,
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
