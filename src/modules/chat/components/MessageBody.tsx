import ScrollableFeed from 'react-scrollable-feed';
import { useSelector } from 'react-redux';
import classes from './style/MessageBody.module.css';
import { selectUser } from 'modules/authentication';
import { MessageDate } from 'modules/chat';

interface Props {
  messages: MessageDate[];
}

export const MessageBody: React.FC<Props> = ({ messages }) => {
  const user = useSelector(selectUser);

  return (
    <ScrollableFeed className={classes.messages}>
      {messages.map(({ text, uid, id, createdAt }, index) => (
        <div key={id}>
          <div
            className={` ${uid === user.id ? classes.sent : classes.received} ${
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
              uid === user.id ? classes.time__sent : classes.time__received
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
