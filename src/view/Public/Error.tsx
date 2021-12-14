import { navigate } from '@reach/router';
import { Button } from 'components';

export const NotFound: React.FC = () => {
  return (
    <Button type="submit" onClick={() => navigate('/messages')}>
      The page you are looking for does not exist. How you get here is a
      mistery. But you can click the button to go back to the homepage
    </Button>
  );
};
