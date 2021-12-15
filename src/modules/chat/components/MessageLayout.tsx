import classes from './style/MessageLayout.module.css';
import {
  MessageHeader,
  MessageBody,
  MessageFooter,
  useContact,
} from 'modules/chat';

export const MessageLayout: React.FC = () => {
  const { contact, sentMessages, receivedMessages, messagesForChat } =
    useContact();
  console.log('Sent messages', sentMessages);
  console.log('Received messages', receivedMessages);
  console.log('All messages', messagesForChat);
  return (
    <div className={classes.container}>
      <MessageHeader
        uid={contact?.uid as string}
        userName={contact?.userName as string}
        userPhoto={contact?.userPhoto as string}
      />
      <MessageBody messages={messagesForChat} />
      <MessageFooter uid={contact?.uid as string} />
    </div>
  );
};
