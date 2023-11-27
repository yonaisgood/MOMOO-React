import { useState, useEffect } from 'react';
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  DocumentData,
} from 'firebase/firestore';

import useAuthContext from './useAuthContext';

import { appFireStore } from '../firebase/config';
export default function useGetAlbumList() {
  const { user } = useAuthContext();
  const [albumDataList, setAlbumDataList] = useState<DocumentData[]>([]);
  const [albumIdList, setAlbumIdList] = useState<string[]>([]);
  const [oldestAlbumList, setOldestAlbumList] = useState<DocumentData[]>([]);

  const fetchData = async () => {
    if (user === null) {
      setAlbumDataList([]);
      setAlbumIdList([]);
      setOldestAlbumList([]);
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

  useEffect(() => {
    fetchData();
  }, [collection]);

  // fetchData 함수를 내보내기
  return { albumDataList, albumIdList, oldestAlbumList, fetchData };
}
