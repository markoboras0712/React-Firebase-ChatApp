import { navigate } from '@reach/router';
import { Button } from 'components';
import { RootState } from 'modules/redux-store';
import { useSelector } from 'react-redux';
import classes from './Error.module.css';

export const Error: React.FC = () => {
  const isLoggedIn = useSelector(
    (state: RootState) => state.user.authenticated,
  );
  return (
    <div className={classes.error}>
      <Button
        type="submit"
        onClick={() => (isLoggedIn ? navigate('/messages') : navigate('/'))}
      >
        The page you are looking for does not exist. How you get here is a
        mistery. But you can click the button to go back to the homepage
      </Button>
    </div>
  );
};
