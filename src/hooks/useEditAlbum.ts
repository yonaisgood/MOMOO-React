import { appFireStore } from '../firebase/config';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import useAuthContext from '../hooks/useAuthContext';
import { User } from '@firebase/auth';

export default function useEditAlbum() {
  const { user: contextUser } = useAuthContext();

  interface Props {
    user?: User | null;
    editAlbumName: string;
    albumId: string;
  }

  const editAlbum = async ({
    editAlbumName,
    albumId,
    user = contextUser,
  }: Props) => {
    if (user === null) {
      return;
    }

    const userAlbumDocRef = doc(
      appFireStore,
      user.uid,
      user.uid,
      'album',
      albumId,
    );

    const albumDoc = await getDoc(userAlbumDocRef);
    if (albumDoc.exists() && albumDoc.data().name === '전체 보기') {
      alert('전체 보기 앨범명은 변경 할 수 없습니다.');
      return;
    }
    await updateDoc(userAlbumDocRef, {
      name: editAlbumName,
    });
  };

  return editAlbum;
}
