import { appFireStore, Timestamp } from '../firebase/config';
import { doc, setDoc } from 'firebase/firestore';
import useAuthContext from '../hooks/useAuthContext';

export default function useAddAlbum(albumName: string) {
  const { user } = useAuthContext();

  const addAlbum = async () => {
    if (user === null) {
      return;
    }

    const userAlbumDocRef = doc(
      appFireStore,
      user.uid,
      user.uid,
      'album',
      albumName,
    );

    await setDoc(userAlbumDocRef, {
      feedList: [],
      createdTime: Timestamp.now(),
    });
  };

  return addAlbum;
}
