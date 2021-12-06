import { Button } from '@mui/material';
import { useAuthentication } from 'modules/authentication';

export const SignOut: React.FC = ({}) => {
  const { logoutUser } = useAuthentication();
  const handleSignOut = () => {
    logoutUser();
  };
  return (
    <div>
      <Button onClick={handleSignOut}>Sign Out</Button>
    </div>
  );
};
