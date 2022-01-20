import {
  saveUser,
  selectUser,
  selectUserActiveChats,
} from 'modules/authentication';
import {
  Message,
  setMessagesListener,
  createNewChat,
  sendNewMessage,
} from 'modules/chat';
import { fetchUsers, selectOtherUserActiveChats } from 'modules/users';
import { useDispatch, useSelector } from 'react-redux';

export const useMessages = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const myChats = useSelector(selectUserActiveChats);
  const otherUserChats = useSelector(selectOtherUserActiveChats);

  const createChat = (msg: string, to: string) => {
    const message: Message = {
      text: msg,
      to: to,
      uid: user.id as string,
    };
    dispatch(createNewChat(message));
    dispatch(fetchUsers());
    dispatch(saveUser(user.id));
  };

  const getMessages = (id: string) => {
    dispatch(setMessagesListener(id));
  };

  const findIdOfChat = () => {
    return myChats.find((chat) => otherUserChats.includes(chat)) as string;
  };

  const sendMsg = async (msg: string, to: string) => {
    let findId;
    if (otherUserChats.length === 0) {
      findId = undefined;
      console.log('return back');
      const message: Message = {
        text: msg,
        to: to,
        uid: user.id as string,
      };
      dispatch(createNewChat(message));
      dispatch(fetchUsers());
      dispatch(saveUser(user.id));
    } else {
      findId = myChats.find((chat) => otherUserChats.includes(chat));
      const message: Message = {
        text: msg,
        to: to,
        uid: user.id as string,
        subCollection: findId,
      };
      dispatch(sendNewMessage(message));
    }
  };

  return {
    createChat,
    getMessages,
    sendMsg,
    findIdOfChat,
  };
};
