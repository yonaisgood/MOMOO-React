import { User } from '@firebase/auth';
import { collection, addDoc } from 'firebase/firestore';

import { appFireStore, Timestamp } from '../firebase/config';

import useAuthContext from './useAuthContext';

interface Props {
  user?: User | null;
  albumName: string;
}

export default function useAddAlbum() {
  const { user: contextUser } = useAuthContext();

  const addAlbum = async ({ albumName, user = contextUser }: Props) => {
    if (user === null) {
      return;
    }

    const userAlbumDocRef = collection(
      appFireStore,
      user.uid,
      user.uid,
      'album',
    );

    await addDoc(userAlbumDocRef, {
      feedList: [],
      createdTime: Timestamp.now(),
      name: albumName,
    });
  };

  return addAlbum;
}
