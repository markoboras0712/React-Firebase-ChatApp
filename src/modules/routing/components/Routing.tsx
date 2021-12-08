import { Router, RouteComponentProps } from '@reach/router';
import { Login } from 'view/Public/Login';
import { AllMessages } from 'view/Authenticated/AllMessages';
import { NotFound } from 'view/Public/Error';
import { Routes } from 'fixtures';
import { Registration } from 'view/Public/Registration';
import { Contacts } from 'view/Authenticated/Contacts';
import { Message } from 'view/Authenticated/Message';

const RouterPage = (
  props: { pageComponent: JSX.Element } & RouteComponentProps,
) => props.pageComponent;

export const Routing: React.FC = () => {
  return (
    <Router>
      <RouterPage path={Routes.Login} pageComponent={<Login />} />
      <RouterPage path={Routes.Register} pageComponent={<Registration />} />
      <RouterPage path={Routes.Messages} pageComponent={<AllMessages />} />
      <RouterPage path={Routes.Contacts} pageComponent={<Contacts />} />
      <RouterPage path={Routes.Message} pageComponent={<Message />} />
      <RouterPage path={Routes.NotFound} pageComponent={<NotFound />} />
    </Router>
  );
};
