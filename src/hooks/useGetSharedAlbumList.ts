import { useEffect, useState } from 'react';

import useAuthContext from './useAuthContext';

import { appFireStore } from '../firebase/config';
import {
  DocumentData,
  DocumentReference,
  doc,
  getDoc,
} from 'firebase/firestore';

export default function useGetSharedAlbumList() {
  const { user } = useAuthContext();
  const [sharedAlbumList, setSharedAlbumList] = useState<DocumentData[]>([]);

  const getSharedAlbumList = async () => {
    if (!user) {
      return [];
    }

    const userDocRef = doc(appFireStore, user.uid, user.uid);
    const userDocSnap = await getDoc(userDocRef);

    const promises = userDocSnap
      .data()
      ?.sharedAlbum.map(async (ref: DocumentReference) => {
        const albumDocSnap = await getDoc(ref);
        const albumData = albumDocSnap.data();

        if (albumData) {
          albumData.uid = ref.path.split('/')[0];
          setSharedAlbumList((prev) => [...prev, albumData]);
        }
      });

    await Promise.all(promises);
  };

  useEffect(() => {
    getSharedAlbumList();
  }, []);

  return { sharedAlbumList };
}
