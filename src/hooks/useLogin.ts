import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';

import useAuthContext from './useAuthContext';

import { appAuth } from '../firebase/config';

export const useLogin = () => {
  const [error, setError] = useState<string | null>(null);
  const [isPending, setPending] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email: string, password: string) => {
    setError(null);
    setPending(true);

    try {
      const { user } = await signInWithEmailAndPassword(
        appAuth,
        email,
        password,
      );
      dispatch({ type: 'login', payload: user });
      setError(null);
      setPending(false);
    } catch (err) {
      if (err instanceof FirebaseError) {
        setError(err.code);
      } else if (err instanceof Error) {
        setError(err.message);
      }

      setPending(false);
    }
  };
  return { error, isPending, login };
};
