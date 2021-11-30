import { Button } from '@mui/material';
import { auth } from 'modules/redux-store';
import { signOut } from '@firebase/auth';

export const SignOut: React.FC = ({}) => {
  const handleSignOut = () => {
    signOut(auth);
  };
  return (
    <div>
      <Button onClick={handleSignOut}>Sign Out</Button>
    </div>
  );
};
