import { appFireStore, Timestamp } from '../firebase/config';
import { collection, addDoc } from 'firebase/firestore';
import useAuthContext from '../hooks/useAuthContext';
import { User } from '@firebase/auth';

export default function useAddAlbum() {
  const { user: contextUser } = useAuthContext();

  interface Props {
    user?: User | null;
    albumName: string;
  }

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
