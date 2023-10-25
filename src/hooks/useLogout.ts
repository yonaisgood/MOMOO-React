import { signOut } from 'firebase/auth';
import { appAuth } from '../firebase/config';

export default async function useLogout() {
  await signOut(appAuth);
}
