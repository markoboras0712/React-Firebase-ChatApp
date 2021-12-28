import React, { useState } from 'react';
import classes from './Navigation.module.css';
import { ReactComponent as Dots } from 'assets/dots.svg';
import { Modal } from 'components';
import { useSelector } from 'react-redux';
import { selectUser } from 'modules/authentication';

export const Navigation: React.FC = () => {
  const user = useSelector(selectUser);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <header className={classes.header}>
      <div className={classes.header__content}>
        <div>
          <img
            src={user.userPhoto as string}
            alt="Avatar"
            className={classes.header__avatar}
          />
        </div>
        <div className={classes.header__chats}>Chats</div>
        <button
          className={classes.header__dots}
          onClick={() => setIsOpen(!isOpen)}
        >
          <Dots />
        </button>
      </div>
      <div className={classes.header__modal}>
        {isOpen && <Modal setIsOpen={setIsOpen} />}
      </div>
      <div className={classes.header__search}>
        <input
          type="text"
          placeholder="Search"
          className={classes.header__searchbar}
        />
      </div>
    </header>
  );
};
