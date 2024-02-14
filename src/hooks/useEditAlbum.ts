import { User } from '@firebase/auth';
import {
  doc,
  updateDoc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';

import useAuthContext from './useAuthContext';

import { appFireStore } from '../firebase/config';

interface Props {
  user?: User | null;
  editAlbumName: string;
  albumId: string;
}

export default function useEditAlbum() {
  const { user: contextUser } = useAuthContext();

  const editAlbum = async ({
    editAlbumName,
    albumId,
    user = contextUser,
  }: Props) => {
    if (user === null) {
      return { success: false, error: '사용자가 로그인되지 않았습니다.' };
    }

    const userAlbumDocRef = doc(
      appFireStore,
      user.uid,
      user.uid,
      'album',
      albumId,
    );

    try {
      const albumDoc = await getDoc(userAlbumDocRef);
      if (albumDoc.exists() && albumDoc.data().name === '전체 보기') {
        return {
          success: false,
          error: '전체 보기 앨범명은 변경 할 수 없습니다.',
        };
      }

      // 유효성 검사 코드 추가
      const duplicateAlbumQuery = query(
        collection(appFireStore, user.uid, user.uid, 'album'),
        where('name', '==', editAlbumName),
      );

      const duplicateAlbumSnapshot = await getDocs(duplicateAlbumQuery);
      if (!duplicateAlbumSnapshot.empty) {
        return {
          success: false,
          error: '이미 동일한 이름의 앨범이 존재합니다.',
        };
      }

      await updateDoc(userAlbumDocRef, {
        name: editAlbumName,
      });

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: '앨범을 수정하는 동안 오류가 발생했습니다.',
      };
    }
  };

  return editAlbum;
}
