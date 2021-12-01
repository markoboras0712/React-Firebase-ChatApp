import { signInWithGoogle } from 'modules/authentication/redux/userActions';
import { useDispatch } from 'react-redux';

export const useAuthentication = () => {
  const dispatch = useDispatch();

  const loginWithGoogle = () => {
    dispatch(signInWithGoogle());
  };
  return { loginWithGoogle };
};
