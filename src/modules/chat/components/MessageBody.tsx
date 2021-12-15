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
export const MessageBody: React.FC = () => {
  return (
    <div className={classes.messagesbox}>
      <div className={classes.messages}>
        {messagesReceived.map(({ text, key }) => (
          <div className={classes.message__received} key={key}>
            {text}
          </div>
        ))}
        <p className={classes.time__received}>16:43</p>
      </div>
      <div className={classes.messages}>
        {messagesReceived.map(({ text, key }) => (
          <div className={classes.message__sent} key={key}>
            {text}
          </div>
        ))}
        <p className={classes.time__sent}>16:43</p>
      </div>
    </div>
  );
};
