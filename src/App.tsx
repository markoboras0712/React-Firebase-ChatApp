import './App.css';
import { SignIn, RegisterUser } from 'modules/authentication/components';
import React from 'react';

export const App: React.FC = () => {
  return (
    <React.Fragment>
      <SignIn />
      <RegisterUser />
    </React.Fragment>
  );
};
