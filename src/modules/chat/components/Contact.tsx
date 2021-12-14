import classes from './style/Contact.module.css';

interface Props {
  uid: string;
  userName: string;
  userPhoto: string;
}

export const Contact: React.FC<Props> = ({ uid, userName, userPhoto }) => {
  return (
    <div className={classes.card} key={uid}>
      <img
        src={userPhoto as string}
        className={classes.card__img}
        alt="Avatar"
      />
      <div>
        <h2 className={classes.card__title}>{userName}</h2>
      </div>
    </div>
  );
};
