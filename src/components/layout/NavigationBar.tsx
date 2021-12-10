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
      <li className={classes.navbar__pages}>
        <Link className={classes.navbar__links} to={'/messages'}>
          Inbox
        </Link>
      </li>
      <li className={classes.navbar__pages}>
        <Link className={classes.navbar__links} to={'/contacts'}>
          Contacts
        </Link>
      </li>
      <li className={classes.navbar__logout}>
        <a className={classes.navbar__links} onClick={handleSignOut}>
          Logout
        </a>
      </li>
    </ul>
  );
};
