import { appFireStore } from '../firebase/config';
import { doc, updateDoc } from 'firebase/firestore';
import useAuthContext from '../hooks/useAuthContext';
import useEditContext from './useEditContext';

export default function useEditFeed() {
  const { user } = useAuthContext();
  const { feedIdtoEdit } = useEditContext();

  const editFeed = async (updateData: {}) => {
    if (user === null) {
      return;
    }

    const feedDocRef = doc(
      appFireStore,
      user.uid,
      user.uid,
      'feed',
      feedIdtoEdit,
    );

    await updateDoc(feedDocRef, updateData);
  };

  return editFeed;
}
