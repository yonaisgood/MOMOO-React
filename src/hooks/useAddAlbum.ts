import { appFireStore, Timestamp } from '../firebase/config';
import { collection, addDoc } from 'firebase/firestore';
import useAuthContext from '../hooks/useAuthContext';

export default function useAddAlbum(albumName: string) {
  const { user } = useAuthContext();

  const addAlbum = async () => {
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
