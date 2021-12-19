import { Router, RouteComponentProps } from '@reach/router';
import { AllMessages } from 'view/Authenticated/AllMessages';
import { NotFound } from 'view/Public/Error';
import { Routes } from 'fixtures';
import { Contacts } from 'view/Authenticated/Contacts';
import { Chat } from 'view/Authenticated/Chat';
import { SignIn } from 'modules/authentication/components/SignIn';
import { Register } from 'modules/authentication/components/Register';

const RouterPage = (
  props: { pageComponent: JSX.Element } & RouteComponentProps,
) => props.pageComponent;

export const Routing: React.FC = () => {
  return (
    <Router>
      <RouterPage path={Routes.Login} pageComponent={<SignIn />} />
      <RouterPage path={Routes.Register} pageComponent={<Register />} />
      <RouterPage path={Routes.Messages} pageComponent={<AllMessages />} />
      <RouterPage path={Routes.Contacts} pageComponent={<Contacts />} />
      <RouterPage path={Routes.Message} pageComponent={<Chat />} />
      <RouterPage path={Routes.NotFound} pageComponent={<NotFound />} />
    </Router>
  );
};
