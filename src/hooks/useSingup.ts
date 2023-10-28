import { useState } from 'react';
import { appAuth } from '../firebase/config';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import useAuthContext from './useAuthContext';
import useUploadImg from './useUploadImg.ts';
import { FirebaseError } from 'firebase/app';

export default function useSignup() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, setPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (
    email: string,
    password: string,
    displayName: string | null,
    file: File | null,
  ) => {
    setError(null);
    setPending(true);

    try {
      const { user } = await createUserWithEmailAndPassword(
        appAuth,
        email,
        password,
      );

      interface Opt {
        displayName?: string;
        photoURL?: string;
      }

      const opt: Opt = {};

      if (displayName !== null) {
        opt.displayName = displayName;
      }

      if (file !== null) {
        opt.photoURL = await useUploadImg(`profile/${user.uid}`, file);
      }

      dispatch({ type: 'login', payload: user });

      if (opt.displayName || opt.photoURL) {
        await updateProfile(user, opt);
        setError(null);
        setPending(false);
        dispatch({ type: 'login', payload: user });
      }
    } catch (err) {
      if (err instanceof FirebaseError) {
        setError(err.code);
      } else if (err instanceof Error) {
        setError(err.message);
      }

      setPending(false);
    }
  };

  return { error, isPending, signup };
}
