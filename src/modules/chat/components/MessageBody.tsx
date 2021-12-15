/* eslint-disable @typescript-eslint/no-unused-vars */
import { Message } from 'modules/chat';
import { RootState } from 'modules/redux-store';
import { useSelector } from 'react-redux';
import classes from './style/MessageBody.module.css';

const messagesReceived = [
  {
    text: 'London is the capital city of England',
    key: '1',
  },
  {
    text: 'It is the most populous city in the United Kingdom',
    key: '2',
  },

  {
    text: 'Hai Milica, long time no see! What’s up? Are you still with that guy Ravas? Im so jelaousIm on vacation, here’s a photo!',
    key: '3',
  },
  {
    text: 'It is the most populous city in the United Kingdom',
    key: '4',
  },

  {
    text: 'Hai Milica, long time no see! What’s up? Are you still with that guy Ravas? Im so jelaousIm on vacation, here’s a photo!',
    key: '5',
  },
  {
    text: 'Hai Milica, long time no see! What’s up? Are you still with that guy Ravas? Im so jelaousIm on vacation, here’s a photo!',
    key: '6',
  },
  {
    text: 'It is the most populous city in the United Kingdom',
    key: '7',
  },

  {
    text: 'Hai Milica, long time no see! What’s up? Are you still with that guy Ravas? Im so jelaousIm on vacation, here’s a photo!',
    key: '8',
  },
  {
    text: 'Hai Milica, long time no see! What’s up? Are you still with that guy Ravas? Im so jelaousIm on vacation, here’s a photo!',
    key: '9',
  },
];

interface Props {
  messages: Message[];
}
export const MessageBody: React.FC<Props> = ({ messages }) => {
  const user = useSelector((state: RootState) => state.user);
  console.log('Logged user in this messagfe', user.userData.id);
  console.log('All messages in msg body', messages);

  return (
    <div className={classes.messagesbox}>
      <div className={classes.messages}>
        {messages.map(({ text, uid }) => (
          <div
            className={`${
              uid === user.userData.id
                ? classes.message__sent
                : classes.message__received
            }`}
            key={Math.random()}
          >
            {text}
          </div>
        ))}
        <p className={classes.time__sent}>16:43</p>
      </div>
    </div>
  );
};
