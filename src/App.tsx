import './App.css';
import React from 'react';
import { Routing } from 'modules/routing/components/Routing';
import { useAuthentication } from 'modules/authentication';

export const App: React.FC = () => {
  const { autoLogin } = useAuthentication();
  autoLogin();
  return (
    <React.Fragment>
      <Routing />
    </React.Fragment>
  );
};
