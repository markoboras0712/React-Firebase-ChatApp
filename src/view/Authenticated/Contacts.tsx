import { Layout } from 'components';
import { ContactList } from 'modules/chat/components/ContactList';

export const Contacts: React.FC = () => {
  return (
    <Layout>
      <ContactList />
    </Layout>
  );
};
