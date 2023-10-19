import { useState } from 'react';
import { appAuth } from '../firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import useAuthContext from './useAuthContext';

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isPending, setPending] = useState(false);
  const { dispatch } = useAuthContext();

  const login = (email: string, password: string) => {
    setError(null);
    setPending(true);

    signInWithEmailAndPassword(appAuth, email, password)
      .then(({ user }) => {
        dispatch({ type: 'login', payload: user });

        setError(null);
        setPending(false);
      })
      .catch((err) => {
        console.log(err);
        if (err.code) {
          setError(err.code);
        } else {
          setError(err.message);
        }

        setPending(false);
      });
  };
  return { error, isPending, login };
};
