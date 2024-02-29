import { useEffect } from 'react';
import { getAlbumByName } from '../../utils/SDKUtils';
import useAuthContext from '../../hooks/useAuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import useCheckAlbumPermission from '../../hooks/useCheckAlbumPermission';
import useGetFeedsData from '../../hooks/useGetFeedsData';

// feed 페이지 재사용
export default function useSetAlbumData() {
  const navigate = useNavigate();
  const { uid, album } = useParams();

  const { user } = useAuthContext();
  const { checkAlbumPermission } = useCheckAlbumPermission();
  const { getFeedsData, feedsData } = useGetFeedsData();

  useEffect(() => {
    if (!user) {
      return;
    }

    if (!uid || !album) {
      navigate('/404');
      return;
    }

    (async () => {
      const albumDoc = await getAlbumByName(uid, album);

      if (!albumDoc) {
        navigate('/404');
        return;
      }

      if (user.uid !== uid) {
        const { isSharedAlbum } = await checkAlbumPermission(albumDoc);

        if (!isSharedAlbum) {
          navigate('/404');
          return;
        }
      }

      const feedList: string[] = [...albumDoc.data().feedList]; // state로
      getFeedsData(feedList, uid); // 무한스크롤 hook으로 분리
    })();
  }, []);

  return { feedsData };
}
