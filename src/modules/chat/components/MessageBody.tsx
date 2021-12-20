/* eslint-disable @typescript-eslint/no-unused-vars */
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
      {messages.map(({ text, uid, id, createdAt }, index) => (
        <div
          className={` ${
            uid === user.userData.id ? classes.sent : classes.received
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
          key={id}
        >
          {text}{' '}
          {messages[index]?.uid !== messages[index - 1]?.uid
            ? 'FIRST'
            : 'notfirst'}
          {messages[index]?.uid !== messages[index + 1]?.uid &&
          messages[index]?.uid === messages[index - 1]?.uid
            ? 'LAST'
            : 'notLast'}
        </div>
      ))}
    </ScrollableFeed>
  );
};
