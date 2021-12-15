/* eslint-disable @typescript-eslint/no-unused-vars */
import classes from '../style/ChatLayout.module.css';
import { MessageHeader, MessageBody, MessageFooter } from 'modules/chat';

export const ChatLayout: React.FC = () => {
  return (
    <div className={classes.container}>
      <MessageHeader />
      <hr className={classes.horizontal_line} />

      <hr className={classes.horizontal_line} />
      <MessageFooter />
    </div>
  );
};
