import { Button } from '@mui/material';
import { auth, provider } from 'modules/redux-store';
import { signInWithPopup } from '@firebase/auth';

export const SignIn: React.FC = ({}) => {
  const handleSignIn = () => {
    signInWithPopup(auth, provider);
  };
  return (
    <div>
      <Button onClick={handleSignIn}>Sign In With Google</Button>
    </div>
  );
};
