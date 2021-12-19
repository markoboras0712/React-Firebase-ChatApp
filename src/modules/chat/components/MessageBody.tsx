import { Message } from 'modules/chat';
import { RootState } from 'modules/redux-store';
import ScrollableFeed from 'react-scrollable-feed';
import { useSelector } from 'react-redux';
import classes from './style/MessageBody.module.css';

interface Props {
  messages: Message[];
}

export const MessageBody: React.FC<Props> = ({ messages }) => {
  const user = useSelector((state: RootState) => state.user);
  return (
    <ScrollableFeed className={classes.messages}>
      {messages.map(({ text, uid, id }) => (
        <div
          className={`${
            uid === user.userData.id ? classes.sent : classes.received
          }`}
          key={id}
        >
          {text}
        </div>
      ))}
    </ScrollableFeed>
  );
};
