import classes from './style/MessageLayout.module.css';
import {
  MessageHeader,
  MessageBody,
  MessageFooter,
  useContact,
} from 'modules/chat';

export const MessageLayout: React.FC = () => {
  const { contact, allMessagesWithTimestamp, maxDate } = useContact();

  return (
    <div className={classes.container}>
      <MessageHeader
        uid={contact.uid}
        userName={contact.userName}
        userPhoto={contact.userPhoto}
      />
      {maxDate ? <p className={classes.message__date}>{maxDate}</p> : ''}
      <MessageBody messages={allMessagesWithTimestamp} />
      <MessageFooter uid={contact.uid} />
    </div>
  );
};
