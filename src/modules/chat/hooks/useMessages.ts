/* eslint-disable @typescript-eslint/no-unused-vars */
import { sendMsg } from 'modules/chat/redux/chatActions';
import { Message, setMessagesListener } from 'modules/chat';
import { db, RootState } from 'modules/redux-store';
import { useDispatch, useSelector } from 'react-redux';
import { collection, getDocs } from 'firebase/firestore';
import { Contact } from 'modules/authentication';

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

  const getUsers = async () => {
    const querySnapshot = await getDocs(collection(db, 'users'));
    const allUsers: Contact[] = querySnapshot.docs.map((res) => ({
      photo: res.data().userPhoto,
      name: res.data().displayName,
    }));
    console.log(allUsers);
    return allUsers;
  };
  return {
    sendMessageToFirestore,
    getMessages,
    getUsers,
  };
};
