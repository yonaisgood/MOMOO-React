import { appFireStore } from '../firebase/config';
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore';
import useAuthContext from './useAuthContext';

export default function useGetSavedAlbumList() {
  const { user } = useAuthContext();

  const getSavedAlbumList = async (feedId: string) => {
    if (user === null) {
      return;
    }

    try {
      const q = query(
        collection(appFireStore, user.uid, user.uid, 'album'),
        where('feedList', 'array-contains', feedId),
        orderBy('createdTime', 'desc'),
      );

      const querySnapshot = await getDocs(q);
      const albumList: string[] = [];

      querySnapshot.forEach((doc) => {
        albumList.push(doc.id);
      });

      return albumList;
    } catch (error) {
      console.log(error);
    }
  };

  return getSavedAlbumList;
}
