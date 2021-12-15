/* eslint-disable @typescript-eslint/no-unused-vars */
import classes from './style/MessageHeader.module.css';
import { ReactComponent as Arrow } from 'assets/arrow.svg';
import { ReactComponent as Dots } from 'assets/dots.svg';
import avatar from 'assets/header_avatar.png';
import { navigate } from '@reach/router';

interface Props {
  uid?: string | undefined;
  userName?: string | undefined;
  userPhoto?: string | undefined;
}

export const MessageHeader: React.FC<Props> = ({
  uid,
  userName,
  userPhoto,
}) => {
  const firstName = userName?.split(' ')[0];
  const lastName = userName?.split(' ')[1];
  return (
    <div className={classes.sticky}>
      <header className={classes.header}>
        <button
          className={classes.header__arrow}
          onClick={() => navigate('/contacts')}
        >
          <Arrow />
        </button>

        <div key={uid} className={classes.header__photo}>
          <img
            src={userPhoto}
            alt="Avatar"
            className={classes.header__avatar}
          />
        </div>
        <div className={classes.header__userName}>
          <p className={classes.header__firstName}>{firstName}</p>
          <p className={classes.header__lastName}>{lastName}</p>
        </div>

        <button className={classes.header__dots}>
          <Dots />
        </button>
      </header>
      <hr className={classes.horizontal_line} />
    </div>
  );
};
