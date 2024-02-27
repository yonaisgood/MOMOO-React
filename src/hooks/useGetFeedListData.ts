import {
  getDocs,
  collection,
  query,
  where,
  or,
  DocumentData,
  orderBy,
} from 'firebase/firestore';

import useAuthContext from './useAuthContext';

import { appFireStore } from '../firebase/config';

export default function useGetFeedListData() {
  const { user } = useAuthContext();

  const getFeedListData = async (feedList: string[], uid: string) => {
    if (user === null) {
      return;
    }

    try {
      const feedRef = collection(
        appFireStore,
        uid || user.uid,
        uid || user.uid,
        'feed',
      );
      const searchList = feedList.map((feedId) => where('id', '==', feedId));
      const q = query(feedRef, or(...searchList), orderBy('timestamp', 'desc'));
      const querySnapshot = await getDocs(q);
      const feedListData: DocumentData[] = [];

      querySnapshot.forEach((doc) => {
        feedListData.push(doc.data());
      });

      return feedListData;
    } catch (error) {
      console.log(error);
    }
  };

  return getFeedListData;
}
