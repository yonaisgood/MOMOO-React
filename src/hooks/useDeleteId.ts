import { useState } from 'react';
import { deleteUser } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';

import { appAuth } from '../firebase/config';

export default function useDeleteId() {
  const [error, setError] = useState<null | string>(null);

  const deleteId = async () => {
    const user = appAuth.currentUser;

    try {
      if (user) {
        await deleteUser(user);
      }
    } catch (err) {
      if (err instanceof FirebaseError) {
        setError(err.code);
      }
    }
  };

  return { deleteId, error };
}
