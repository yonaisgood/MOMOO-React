import { useState, useEffect } from 'react';
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
  const [isPending, setIsPending] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

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

    try {
      setIsPending(true);

      // "전체 보기" 앨범이라면 삭제를 막음
      const albumDoc = await getDoc(userAlbumDocRef);
      if (albumDoc.exists() && albumDoc.data().name === '전체 보기') {
        setError('전체 보기 앨범은 삭제할 수 없습니다.');
        return {
          success: false,
          message: '전체 보기 앨범은 삭제할 수 없습니다.',
        };
      }

      // "전체 보기" 앨범이 아닌 경우에만 삭제 진행

      await deleteDoc(userAlbumDocRef);
      setIsPending(false);

      return { success: true, message: '앨범이 삭제되었습니다.' };
    } catch (error) {
      setError('앨범 삭제 중 오류가 발생했습니다.');
      setIsPending(false);
      return { success: false, message: '앨범 삭제 중 오류가 발생했습니다.' };
    }
  };

  return { deleteAlbum, isPending, error };
}
