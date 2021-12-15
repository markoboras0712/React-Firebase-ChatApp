import classes from './style/MessageFooter.module.css';
import { ReactComponent as Smiley } from 'assets/smiley.svg';
import { ReactComponent as Buttons } from 'assets/imgupload.svg';

export const MessageFooter: React.FC = () => {
  return (
    <div className={classes.footer}>
      <button className={classes.footer__smiley}>
        <Smiley />
      </button>

      <input
        type="text"
        placeholder="Type a message"
        className={classes.footer__input}
      />
      <button className={classes.footer__imgbuttons}>
        <Buttons />
      </button>
    </div>
  );
};
