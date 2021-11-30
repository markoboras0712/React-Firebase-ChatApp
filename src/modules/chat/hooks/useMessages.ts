import { fetchMessages } from 'modules/chat/redux/chatActions';
import { RootState } from 'modules/redux-store/rootReducer';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useMessages = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);
  return useSelector((state: RootState) => state.messages.allMessages);
};
