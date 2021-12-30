import { Link } from '@reach/router';
import { selectUser, useAuthentication } from 'modules/authentication';
import { useSelector } from 'react-redux';
import classes from './Modal.module.css';

interface Props {
  setIsOpen: (isOpen: boolean) => void;
}

export const Modal = ({ setIsOpen }: Props) => {
  const user = useSelector(selectUser);
  const { logoutUser } = useAuthentication();
  return (
    <div className={classes.modal} onClick={() => setIsOpen(false)}>
      <ul className={classes.modal__links}>
        <li className={classes.modal__item}>
          <Link to={'/messages'}>
            <button type="button" className={classes.modal__button}>
              Inbox
            </button>
          </Link>
        </li>
        <li className={classes.modal__item}>
          <Link to={'/contacts'}>
            <button type="button" className={classes.modal__button}>
              Contacts
            </button>
          </Link>
        </li>
        {user.authenticated && (
          <li className={classes.modal__item}>
            <Link to={'/'}>
              <button
                type="button"
                className={classes.modal__button}
                onClick={() => logoutUser()}
              >
                Logout
              </button>
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};