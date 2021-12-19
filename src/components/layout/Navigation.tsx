import { Link } from '@reach/router';
import { Button } from 'components';
import { useAuthentication } from 'modules/authentication';
import { RootState } from 'modules/redux-store';
import { useSelector } from 'react-redux';
import classes from './Navigation.module.css';
import logo from 'assets/chatIcon.svg';

export const Navigation: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const { logoutUser } = useAuthentication();

  return (
    <header className={classes.header}>
      <img src={logo} alt="logo" className={classes.header__logo} />
      <img
        src={user.userPhoto as string}
        alt="avatar"
        className={classes.header__avatar}
      />
      <nav className={classes.navigation}>
        <ul className={classes.navigation__links}>
          <li className={classes.navigation__item}>
            <Link to={'/messages'}>
              <Button>Inbox</Button>
            </Link>
          </li>
          <li className={classes.navigation__item}>
            <Link to={'/contacts'}>
              <Button>Contacts</Button>
            </Link>
          </li>
          {user.authenticated && (
            <li className={classes.navigation__item}>
              <Link to={'/'}>
                <Button onClick={() => logoutUser()}>Logout</Button>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};
