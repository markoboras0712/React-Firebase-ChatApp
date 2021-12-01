import './App.css';
import { SignIn } from 'modules/authentication/components';
import React from 'react';

export const App: React.FC = () => {
  return (
    <React.Fragment>
      <SignIn />
    </React.Fragment>
  );
};
