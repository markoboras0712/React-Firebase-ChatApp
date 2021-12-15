import classes from './style/MessageHeader.module.css';
import { ReactComponent as Arrow } from 'assets/arrow.svg';
import { ReactComponent as Dots } from 'assets/dots.svg';
import avatar from 'assets/header_avatar.png';

export const MessageHeader: React.FC = () => {
  return (
    <header className={classes.header}>
      <button className={classes.header__arrow}>
        <Arrow />
      </button>

      <div className={classes.header__photo}>
        <img src={avatar} alt="Avatar" className={classes.header__avatar} />
      </div>
      <div className={classes.header__userName}>
        <p className={classes.header__firstName}>Milica</p>
        <p className={classes.header__lastName}>Sekulic</p>
      </div>

      <button className={classes.header__dots}>
        <Dots />
      </button>
    </header>
  );
};
