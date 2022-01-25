/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { selectAllOtherUsers } from 'modules/users';
import { useDispatch, useSelector } from 'react-redux';

export const useMessages = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const myChats = useSelector(selectUserActiveChats);

  const otherUsers = useSelector(selectAllOtherUsers);
  const getMessages = (id: string) => {
    dispatch(setMessagesListener(id));
  };

  const findIdOfChat = (id: string) => {
    const otherUsersActiveChats = otherUsers
      .find((user) => user.uid === id)
      ?.activeChats.map((chat) => chat);

    return (myChats as string[]).find((chat) =>
      otherUsersActiveChats?.includes(chat),
    );
  };

  const sendMsg = (msg: string, to: string, idOfChat: string | undefined) => {
    let findId;
    const FINDTESTTT = otherUsers
      .find((user) => user.uid === to)
      ?.activeChats.map((chat) => chat) as string[];

    if (!idOfChat) {
      const message: Message = {
        text: msg,
        to: to,
        uid: user.id as string,
      };
      dispatch(createNewChat(message));
    } else {
      findId = (myChats as string[]).find((chat) => FINDTESTTT.includes(chat));
      const message: Message = {
        text: msg,
        to: to,
        uid: user.id as string,
        subCollection: idOfChat,
      };
      dispatch(sendNewMessage(message));
    }
  };

  return {
    getMessages,
    sendMsg,
    findIdOfChat,
  };
};
