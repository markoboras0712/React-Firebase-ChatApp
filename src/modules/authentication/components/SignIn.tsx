import { Button } from '@mui/material';
import { useAuthentication } from 'modules/authentication/hooks/useAuthentication';

export const SignIn: React.FC = ({}) => {
  const { loginWithGoogle } = useAuthentication();
  //const dispatch = useDispatch();
  const handleSignIn = () => {
    loginWithGoogle();
  };
  return (
    <div>
      <Button onClick={handleSignIn}>Sign In With Google</Button>
    </div>
  );
};
