import { getDoc, doc } from 'firebase/firestore';

import useAuthContext from './useAuthContext';

import { appFireStore } from '../firebase/config';

export default function useGetFeedData() {
  const { user } = useAuthContext();

  const getFeedData = async (feedId: string) => {
    if (user === null) {
      return;
    }

    try {
      const docSnap = await getDoc(
        doc(appFireStore, user.uid, user.uid, 'feed', feedId),
      );

      return docSnap.data();
    } catch (error) {
      console.log(error);
    }
  };

  return getFeedData;
}
