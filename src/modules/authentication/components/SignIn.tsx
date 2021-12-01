import { Button } from '@mui/material';
import { signInWithGoogle } from 'modules/authentication/redux/userActions';
import { useDispatch } from 'react-redux';

export const SignIn: React.FC = ({}) => {
  const dispatch = useDispatch();
  const handleSignIn = () => {
    dispatch(signInWithGoogle());
  };
  return (
    <div>
      <Button onClick={handleSignIn}>Sign In With Google</Button>
    </div>
  );
};
