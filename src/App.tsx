import './App.css';
import { Routing } from 'modules/routing/components/Routing';
import { AuthListener } from 'modules/authentication';

export const App: React.FC = () => {
  return (
    <AuthListener>
      <Routing />
    </AuthListener>
  );
};
