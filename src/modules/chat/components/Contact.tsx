import { Link } from '@reach/router';
import { ReactComponent as Shape } from 'assets/Shape.svg';
import classes from './style/Contact.module.css';

interface Props {
  uid: string;
  userName: string;
  userPhoto: string;
}

export const Contact: React.FC<Props> = ({ uid, userName, userPhoto }) => {
  return (
    <Link to={`/messages/${uid}`} className={classes.link}>
      <div className={classes.contact} key={uid}>
        <img
          src={userPhoto as string}
          alt="avatar"
          className={classes.contact__avatar}
        />

        <span className={classes.contact__userName}>{userName}</span>
        <button type="button" className={classes.contact__shape}>
          <Shape />
        </button>
      </div>
    </Link>
  );
};
