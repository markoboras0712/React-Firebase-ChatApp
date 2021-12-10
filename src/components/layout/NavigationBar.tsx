import { useAuthentication } from 'modules/authentication';
import { Link } from '@reach/router';
import classes from './NavigationBar.module.css';

export const NavigationBar: React.FC = () => {
  const { logoutUser } = useAuthentication();
  const handleSignOut = () => {
    logoutUser();
  };
  return (
    <ul className={classes.navbar}>
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
      <li className={classes.navigation__logout}>
        <a className={classes.navigation__link} onClick={handleSignOut}>
          Logout
        </a>
      </li>
    </ul>
  );
};
