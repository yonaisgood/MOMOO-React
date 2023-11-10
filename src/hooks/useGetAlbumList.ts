import { appFireStore } from '../firebase/config';
import {
  collection,
  getDocs,
  DocumentData,
  query,
  orderBy,
} from 'firebase/firestore';
import useAuthContext from './useAuthContext';

export default function useGetAlbumList() {
  const { user } = useAuthContext();

  const getAlbumList = async () => {
    if (user === null) {
      return;
    }

    try {
      const q = query(
        collection(appFireStore, user.uid, user.uid, 'album'),
        orderBy('createdTime', 'desc'),
      );
      const querySnapshot = await getDocs(q);

      const albumList: DocumentData[] = [];

      querySnapshot.forEach((doc) => {
        albumList.push(doc.data());
      });

      return albumList;
    } catch (error) {
      console.log(error);
    }
  };
  return getAlbumList;
}
