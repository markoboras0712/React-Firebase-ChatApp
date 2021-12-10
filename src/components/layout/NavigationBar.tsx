import { useAuthentication } from 'modules/authentication';
import { Link } from '@reach/router';
import classes from './NavigationBar.module.css';
import { useSelector } from 'react-redux';
import { RootState } from 'modules/redux-store';

export const NavigationBar: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const { logoutUser } = useAuthentication();
  const handleSignOut = () => {
    logoutUser();
  };
  return (
    <ul className={classes.navigation}>
      {user.authenticated && (
        <li>
          <img
            src={user.userPhoto as string}
            alt="Avatar"
            className={classes.navigation__avatar}
          />
        </li>
      )}

      <li>
        <Link className={classes.navigation__link} to={'/messages'}>
          Inbox
        </Link>
      </li>

      <li>
        <Link className={classes.navigation__link} to={'/contacts'}>
          Contacts
        </Link>
      </li>
      {user.authenticated && (
        <li className={classes.navigation__logout}>
          <button
            type="button"
            className={classes.navigation__button}
            onClick={handleSignOut}
          >
            Logout
          </button>
        </li>
      )}
    </ul>
  );
};
