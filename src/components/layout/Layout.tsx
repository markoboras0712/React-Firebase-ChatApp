import { NavigationBar } from 'components/layout/NavigationBar';
import classes from './Layout.module.css';

export const Layout: React.FC = ({ children }) => {
  return (
    <div>
      <NavigationBar />
      <main className={classes.main}>{children}</main>
    </div>
  );
};
