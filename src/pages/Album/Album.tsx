import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { DocumentData } from 'firebase/firestore';

import useUploadContext from '../../hooks/useUploadContext';
import useGetAlbumFeedList from '../../hooks/useGetAlbumFeedList';
import useGetFeedListData from '../../hooks/useGetFeedListData';
import useSetFeedItemLayout from './useSetFeedItemLayout';

import BreadcrumbWrap from '../../components/Breadcrumb/BreadcrumbWrap';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import LoadingComponent from '../../components/Loading/LoadingComponent';
import FeedItem from './FeedItem';
import StyledH2 from '../../components/CommonStyled/StyledH2';
import StyledAlbum, { StyledFeedList, StyledAddFeedItem } from './StyledAlbum';

import AddIcon from '../../asset/icon/Add_L.svg';
import TopBar from '../../components/Topbar/Topbar';

export default function Album() {
  const [clientWitch, setClientWitch] = useState(
    document.documentElement.clientWidth,
  );
  const [feedList, setFeedList] = useState<DocumentData[] | null>(null);
  const [albumName, setAlbumName] = useState<null | string>(null);
  const { uid, album } = useParams();
  const navigate = useNavigate();

  const getAlbumFeedList = useGetAlbumFeedList();
  const getFeedListData = useGetFeedListData();
  const { setAlbumNameListToAdd, setIsUploadModalOpen } = useUploadContext();
  const { imgRatio, setRatio, setGridRowEnd } = useSetFeedItemLayout();

  useEffect(() => {
    if (!uid || !album) {
      navigate('/404');
      return;
    }

    // 엑세스 권한 없을 경우 로직 추가하기

    window.addEventListener('resize', () => {
      setClientWitch(document.documentElement.clientWidth);
    });

    const setAlbumData = async () => {
      const albumNameToSet = album.replace(/-/gi, ' ');
      const albumFeedList = await getAlbumFeedList(albumNameToSet, uid);

      if (!albumFeedList) {
        navigate('/404');
        return;
      }

      setAlbumName(albumNameToSet);

      if (!albumFeedList.length) {
        setFeedList([]);
        setRatio(null);
        return;
      }

      const feedListData = await getFeedListData(albumFeedList, uid);

      if (!feedListData?.length) {
        setFeedList([]);
        setRatio(null);
        return;
      }

      setFeedList(feedListData);
      setRatio(feedListData[feedListData.length - 1].imageUrl[0]);
    };

    (async () => {
      setAlbumData();
    })();
  }, []);

  const openUpload = () => {
    if (albumName && albumName !== '전체 보기') {
      setAlbumNameListToAdd(['전체 보기', albumName]);
    }

    if (clientWitch > 430) {
      setIsUploadModalOpen(true);
    } else {
      navigate('/upload');
    }
  };

  return (
    <>
      <Helmet>{albumName && <title>{albumName} | MOMOO</title>}</Helmet>

      {albumName && (
        <>
          {clientWitch <= 430 && <TopBar tit={albumName} />}
          <StyledAlbum>
            {clientWitch > 1024 && (
              <>
                <StyledH2>{albumName}</StyledH2>
                <Breadcrumb
                  navList={[
                    { path: '/', text: 'Home' },
                    { path: '', text: albumName },
                  ]}
                />
              </>
            )}
            {clientWitch > 430 && clientWitch <= 1024 && (
              <BreadcrumbWrap
                navList={[
                  { path: '/', text: 'Home' },
                  { path: '', text: albumName },
                ]}
                title={albumName || ''}
              />
            )}
            <section>
              <h3 className="a11y-hidden">게시글 목록</h3>
              {!feedList && <LoadingComponent />}
              {feedList && (
                <StyledFeedList>
                  {feedList.length > 0 &&
                    feedList.map((v) => {
                      return <FeedItem key={v.id} feedData={v}></FeedItem>;
                    })}
                  {/* 현재 앨범에 사진 추가 UI 변경 예정 */}
                  {imgRatio.width && imgRatio.height && (
                    <StyledAddFeedItem
                      $ratio={imgRatio.width / imgRatio.height}
                      ref={(node) => {
                        if (node) {
                          setGridRowEnd(node);
                        }
                      }}
                    >
                      <button
                        type="button"
                        aria-label="새 게시물"
                        onClick={openUpload}
                      >
                        <img src={AddIcon} alt="추가하기" />
                      </button>
                    </StyledAddFeedItem>
                  )}
                </StyledFeedList>
              )}
            </section>
          </StyledAlbum>
        </>
      )}
    </>
  );
}
