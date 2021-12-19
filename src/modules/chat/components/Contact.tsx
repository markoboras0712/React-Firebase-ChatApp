import { Link } from '@reach/router';
import classes from './style/Contact.module.css';

interface Props {
  uid: string;
  userName: string;
  userPhoto: string;
}

export const Contact: React.FC<Props> = ({ uid, userName, userPhoto }) => {
  return (
    <div className={classes.contact} key={uid}>
      <Link to={`/messages/${uid}`}>
        <img
          src={userPhoto as string}
          alt="avatar"
          className={classes.contact__avatar}
        />
      </Link>
      <span className={classes.contact__userName}>{userName}</span>
    </div>
  );
};
