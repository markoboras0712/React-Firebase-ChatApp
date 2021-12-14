/* eslint-disable @typescript-eslint/no-unused-vars */
import { useAuthentication } from 'modules/authentication';
import { useContacts } from 'modules/users/hooks/useContacts';
import classes from './ContactList.module.css';
export const MessageList: React.FC = () => {
  const contacts = useContacts();

  return (
    <div>
      <div className={classes.container}>
        {contacts.map(({ uid, userName, userPhoto }) => (
          <div className={classes.card} key={uid}>
            <img
              src={userPhoto as string}
              className={classes.card__img}
              alt="Avatar"
            />
            <div className={classes.card__container}>
              <h2>
                <b>{userName}</b>
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
