import { Link } from '@reach/router';
import classes from './style/Contact.module.css';

interface Props {
  uid: string;
  userName: string;
  userPhoto: string;
}

export const Contact: React.FC<Props> = ({ uid, userName, userPhoto }) => {
  return (
    <div className={classes.card} key={uid}>
      <Link to={`/messages/${uid}`}>
        <img
          src={userPhoto as string}
          className={classes.card__img}
          alt="Avatar"
        />
      </Link>
      <div>
        <h2 className={classes.card__title}>{userName}</h2>
      </div>
    </div>
  );
};
