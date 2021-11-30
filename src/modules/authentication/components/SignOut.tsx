import { Button } from '@mui/material';
import { auth } from 'firebase';
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
