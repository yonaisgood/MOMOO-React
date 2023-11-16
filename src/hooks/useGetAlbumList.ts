import { appFireStore } from '../firebase/config';
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  DocumentData,
} from 'firebase/firestore';
import useAuthContext from './useAuthContext';
import { useState, useEffect } from 'react';

export default function useGetAlbumList() {
  const { user } = useAuthContext();
  const [albumDataList, setAlbumDataList] = useState<DocumentData[]>([]);
  const [albumIdList, setAlbumIdList] = useState<string[]>([]);
  const [oldestAlbumList, setOldestAlbumList] = useState<DocumentData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (user === null) {
        setAlbumDataList([]);
        setAlbumIdList([]);
        return;
      }

      const q = query(
        collection(appFireStore, user.uid, user.uid, 'album'),
        orderBy('createdTime'),
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const updatedAlbumDataList: DocumentData[] = [];
        const updatedAlbumIdList: string[] = [];

        querySnapshot.forEach((doc) => {
          updatedAlbumDataList.push({ ...doc.data(), id: doc.id });
          updatedAlbumIdList.push(doc.id);
        });

        const oldestAlbumListtoSet = [...updatedAlbumDataList].reverse();
        const allFeedsAlbumData = oldestAlbumListtoSet.pop();

        if (allFeedsAlbumData) {
          oldestAlbumListtoSet.unshift(allFeedsAlbumData);
        }

        setOldestAlbumList(oldestAlbumListtoSet);
        setAlbumDataList(updatedAlbumDataList);
        setAlbumIdList(updatedAlbumIdList);
      });

      return () => {
        unsubscribe();
      };
    };

    fetchData();
  }, [collection]);

  return { albumDataList, albumIdList, oldestAlbumList };
}
