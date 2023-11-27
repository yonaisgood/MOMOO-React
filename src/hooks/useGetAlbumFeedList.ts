import { getDocs, collection, query, where } from 'firebase/firestore';

import useAuthContext from './useAuthContext';

import { appFireStore } from '../firebase/config';

export default function useGetAlbumFeedList() {
  const { user } = useAuthContext();

  const getAlbumFeedList = async (albumName: string) => {
    if (user === null) {
      return;
    }

    try {
      const albumRef = collection(appFireStore, user.uid, user.uid, 'album');

      const querySnapshot = await getDocs(
        query(albumRef, where('name', '==', albumName)),
      );

      if (!querySnapshot.docs.length) {
        return null;
      }

      const feedList: string[] = [];

      querySnapshot.forEach((doc) => {
        feedList.push(...doc.data().feedList);
      });

      return feedList;
    } catch (error) {
      console.log(error);
    }
  };

  return getAlbumFeedList;
}
