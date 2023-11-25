import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';

import useAuthContext from './useAuthContext';
import useUploadImg from './useUploadImg.ts';
import useAddAlbum from './useAddAlbum.ts';

import { appAuth } from '../firebase/config';

export default function useSignup() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, setPending] = useState(false);
  const { dispatch } = useAuthContext();
  const addAlbum = useAddAlbum();

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

      if (opt.displayName || opt.photoURL) {
        await updateProfile(user, opt);
      }

      await addAlbum({ albumName: '전체 보기', user });
      setError(null);
      setPending(false);

      dispatch({ type: 'login', payload: user });
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
