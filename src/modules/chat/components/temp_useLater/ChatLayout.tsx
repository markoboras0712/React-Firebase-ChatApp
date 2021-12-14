/* eslint-disable @typescript-eslint/no-unused-vars */
import classes from '../style/ChatLayout.module.css';
import arrow from 'assets/arrow.svg';
import avatar from 'assets/header_avatar.png';
import dots from 'assets/dots.svg';
import line from 'assets/line.svg';
import seen from 'assets/seen.svg';
import smiley from 'assets/smiley.svg';
import imgupload from 'assets/imgupload.svg';

export const ChatLayout: React.FC = () => {
  return (
    <div className={classes.container}>
      <header className={classes.header}>
        <img src={arrow} alt="arrow" className={classes.header__arrow} />

        <div className={classes.header__photo}>
          <img src={avatar} alt="Avatar" className={classes.header__avatar} />
        </div>

        <h4 className={classes.header__name}>Marko Boras</h4>

        <img src={dots} alt="threedots" className={classes.header__dots} />
      </header>
      <img src={line} alt="line" />
      <p className={classes.message__day}>DAY</p>
      <div className={classes.messages}>
        <div className={classes.message__received}>
          London is the capital city of England. It is the most populous city in
          the United Kingdom, with a metropolitan area of over 13 million
          inhabitants. London is the capital city of England. It is the most
        </div>
        <p className={classes.time__received}>16:43</p>
        <div className={classes.message__sent}>
          London is the capital city of England. It is the most populous city in
          the United Kingdom, with a metropolitan area of over 13 millionnited
          Kingdom, with a metropolitan area of over 13 million inhabitants.
          London is the capital ciasdasdsdasda
        </div>
        <img src={seen} alt="seen" className={classes.message__seen} />

        <p className={classes.time__sent}>16:43</p>
      </div>
      <div className={classes.footer}>
        <img src={smiley} className={classes.emoji} alt="emoji" />

        <input
          type="text"
          placeholder="Type a message"
          className={classes.sendMessage}
        />
        <img src={imgupload} className={classes.photo} alt="imgupload" />
      </div>
    </div>
  );
};
