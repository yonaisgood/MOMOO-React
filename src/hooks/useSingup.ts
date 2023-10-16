import { useState } from 'react';
import { appAuth } from '../firebase/config';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import useAuthContext from './useAuthContext';
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from 'firebase/storage';
import { storage } from '../firebase/config.ts';

export default function useSignup() {
  const [error, setError] = useState(null);
  const [isPending, setPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = (
    email: string,
    password: string,
    displayName: string | null,
    file: File | null
  ) => {
    setError(null);
    setPending(true);

    createUserWithEmailAndPassword(appAuth, email, password)
      .then(async ({ user }) => {
        if (!user || appAuth.currentUser === null) {
          throw new Error('회원 가입에 실패했습니다');
        }

        interface Opt {
          displayName?: string;
          photoURL?: string;
        }

        const opt: Opt = {};

        if (displayName !== null) {
          opt.displayName = displayName;
        }

        if (file !== null) {
          const storageRef = ref(storage, `profile/${email}`);
          const uploadTask = uploadBytesResumable(storageRef, file);

          await uploadBytes(storageRef, file).then(() => {});

          await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            opt.photoURL = downloadURL;
          });
        }

        if (opt.displayName || opt.photoURL) {
          updateProfile(appAuth.currentUser, opt)
            .then(() => {
              setError(null);
              setPending(false);
              dispatch({ type: 'login', payload: user });
            })
            .catch((err) => {
              setError(err.code);
              setPending(false);
            });
        }
      })
      .catch((err) => {
        if (err.code) {
          setError(err.code);
        } else {
          setError(err.message);
        }

        setPending(false);
      });
  };

  return { error, isPending, signup };
}
