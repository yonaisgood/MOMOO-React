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
    const albumDataList: DocumentData[] = [];
    const albumIdList: string[] = [];

    if (user === null) {
      return { albumDataList, albumIdList };
    }

    try {
      const q = query(
        collection(appFireStore, user.uid, user.uid, 'album'),
        orderBy('createdTime', 'desc'),
      );
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        albumDataList.push(doc.data());
        albumIdList.push(doc.id);
      });
    } catch (error) {
      console.log(error);
    }

    return { albumDataList, albumIdList };
  };

  return getAlbumList;
}
