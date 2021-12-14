import './App.css';
import React from 'react';
import { Routing } from 'modules/routing/components/Routing';
import { AuthListener } from 'modules/authentication';

export const App: React.FC = () => {
  return (
    <React.Fragment>
      <AuthListener>
        <Routing />
      </AuthListener>
    </React.Fragment>
  );
};
