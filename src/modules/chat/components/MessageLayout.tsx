import classes from './style/MessageLayout.module.css';
import {
  MessageHeader,
  MessageBody,
  MessageFooter,
  useContact,
} from 'modules/chat';

export const MessageLayout: React.FC = () => {
  const contact = useContact();
  return (
    <div className={classes.container}>
      <MessageHeader
        uid={contact?.uid as string}
        userName={contact?.userName as string}
        userPhoto={contact?.userPhoto as string}
      />
      <MessageBody />
      <MessageFooter uid={contact?.uid as string} />
    </div>
  );
};
