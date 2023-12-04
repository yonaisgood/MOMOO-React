import { signOut } from 'firebase/auth';

import { appAuth } from '../firebase/config';
import { useState } from 'react';

export default function useLogout() {
  const [isPending, setIsPending] = useState(false);

  const logout = async () => {
    setIsPending(true);

    try {
      await signOut(appAuth);
    } catch (error) {
      alert('로그아웃에 실패했습니다');
    }

    setIsPending(false);
  };

  return { logout, isPending };
}
