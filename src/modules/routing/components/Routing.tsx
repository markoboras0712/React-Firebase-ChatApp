import { Router, RouteComponentProps } from '@reach/router';
import { Login } from 'view/Public/Login';
import { AllMessages } from 'view/Authenticated/AllMessages';
import { NotFound } from 'view/Public/Error';
import { Registration } from 'view/Public/Registration';

const RouterPage = (
  props: { pageComponent: JSX.Element } & RouteComponentProps,
) => props.pageComponent;

export const Routing: React.FC = () => {
  return (
    <Router>
      <RouterPage path="/" pageComponent={<Login />} />
      <RouterPage path="register" pageComponent={<Registration />} />
      <RouterPage path="messages" pageComponent={<AllMessages />} />
      <RouterPage path="*" pageComponent={<NotFound />} />
    </Router>
  );
};
