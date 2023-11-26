import { User } from '@firebase/auth';
import { doc, deleteDoc, getDoc } from 'firebase/firestore';

import useAuthContext from './useAuthContext';

import { appFireStore } from '../firebase/config';

interface Props {
  user?: User | null;
  albumId: string;
}

export default function useDeleteAlbum() {
  const { user: contextUser } = useAuthContext();

  const deleteAlbum = async ({ albumId, user = contextUser }: Props) => {
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

    // "전체 보기" 앨범이라면 삭제를 막음
    const albumDoc = await getDoc(userAlbumDocRef);
    if (albumDoc.exists() && albumDoc.data().name === '전체 보기') {
      alert('전체 보기 앨범은 삭제할 수 없습니다.');
      return;
    }

    // "전체 보기" 앨범이 아닌 경우에만 삭제 진행
    await deleteDoc(userAlbumDocRef);
    alert('앨범이 삭제되었습니다');
  };

  return deleteAlbum;
}
