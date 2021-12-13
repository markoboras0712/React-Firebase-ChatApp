import { navigate } from '@reach/router';
import { NavigationBar } from 'components/layout/NavigationBar';

export const NotFound: React.FC = () => {
  const returnHomeHandler = () => {
    navigate('/messages');
  };
  return (
    <div>
      <NavigationBar />
      <p>
        {' '}
        The page you are looking for does not exist. How you get here is a
        mistery. But you can click the button below to go back to the homepage
      </p>
      <button type="submit" onClick={returnHomeHandler}>
        HOME
      </button>
    </div>
  );
};
