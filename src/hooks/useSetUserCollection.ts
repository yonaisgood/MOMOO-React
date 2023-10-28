import { doc, setDoc } from 'firebase/firestore';
import { appFireStore } from '../firebase/config';
import { User } from 'firebase/auth';

export default async function useSetUserCollection(user: User) {
  try {
    await setDoc(doc(appFireStore, user.uid, 'feed'), {});
    await setDoc(doc(appFireStore, user.uid, 'album'), {});
  } catch (err) {
    console.error(err);
  }
}
