import './App.css';
import { Chat } from 'modules/chat/components';
import { SignIn } from 'modules/authentication/components';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from 'modules/redux-store/firebase';
import React from 'react';

export const App: React.FC = () => {
  const [user] = useAuthState(auth);
  return <React.Fragment>{user ? <Chat /> : <SignIn />}</React.Fragment>;
};
