import { Button } from '@mui/material';
import { auth } from 'modules/redux-store';
import { signOut } from '@firebase/auth';
import { navigate } from '@reach/router';

export const SignOut: React.FC = ({}) => {
  const handleSignOut = async () => {
    await signOut(auth);
    navigate('/');
  };
  return (
    <div>
      <Button onClick={handleSignOut}>Sign Out</Button>
    </div>
  );
};
