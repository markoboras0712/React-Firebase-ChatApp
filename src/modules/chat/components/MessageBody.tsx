import { RootState } from 'modules/redux-store';
import ScrollableFeed from 'react-scrollable-feed';
import { useSelector } from 'react-redux';
import classes from './style/MessageBody.module.css';
interface Messages {
  createdAt: Date;
  text?: string | undefined;
  uid?: string | undefined;
  to?: string | undefined;
  userName?: string | null | undefined;
  userPhoto?: string | null | undefined;
  id?: string | undefined;
}
interface Props {
  messages: Messages[];
}

export const MessageBody: React.FC<Props> = ({ messages }) => {
  const user = useSelector((state: RootState) => state.user);

  return (
    <ScrollableFeed className={classes.messages}>
      {messages.map(({ text, uid, id, createdAt }, index) => (
        <div key={id}>
          <div
            className={` ${
              uid === user.user.id ? classes.sent : classes.received
            } ${
              messages[index]?.uid !== messages[index - 1]?.uid
                ? classes.first
                : ''
            } ${
              messages[index]?.uid !== messages[index + 1]?.uid &&
              messages[index]?.uid === messages[index - 1]?.uid
                ? classes.last
                : ''
            }`}
          >
            {text}
          </div>
          <p
            className={`${
              uid === user.user.id ? classes.time__sent : classes.time__received
            } ${
              messages[index]?.uid === messages[index + 1]?.uid
                ? classes.hidetime
                : ''
            }
            `}
          >
            {createdAt?.getHours() + ':' + createdAt?.getMinutes()}
          </p>
        </div>
      ))}
    </ScrollableFeed>
  );
};
