import { doc, updateDoc } from 'firebase/firestore';

import useEditContext from './useEditContext';
import useAuthContext from './useAuthContext';

import { appFireStore } from '../firebase/config';

export default function useEditFeed() {
  const { user } = useAuthContext();
  const { feedIdToEdit } = useEditContext();

  const editFeed = async (updateData: {}) => {
    if (user === null) {
      return;
    }

    const feedDocRef = doc(
      appFireStore,
      user.uid,
      user.uid,
      'feed',
      feedIdToEdit,
    );

    await updateDoc(feedDocRef, updateData);
  };

  return editFeed;
}
