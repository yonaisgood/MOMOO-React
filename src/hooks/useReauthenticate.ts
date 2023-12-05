import { useState } from 'react';
import { reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';

import { appAuth } from '../firebase/config';

export default function useReauthenticate() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const user = appAuth.currentUser;

  const reauthenticate = async (userProvidedPassword: string) => {
    if (user === null || user?.email === null) {
      return false;
    }

    setIsPending(true);

    const credential = EmailAuthProvider.credential(
      user.email,
      userProvidedPassword,
    );

    try {
      await reauthenticateWithCredential(user, credential);
      setIsPending(false);
      return true;
    } catch (err) {
      if (err instanceof FirebaseError) {
        setError(err.code);
      }

      setIsPending(false);
      return false;
    }
  };

  return { reauthenticate, error, isPending };
}
