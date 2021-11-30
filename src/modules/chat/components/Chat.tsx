import { SignOut } from 'modules/authentication/components';
import { useMessages } from 'modules/chat/hooks/useMessages';

export const Chat: React.FC = ({}) => {
  const messages = useMessages();
  console.log(messages);
  return (
    <div>
      <SignOut />
      Chat
    </div>
  );
};
