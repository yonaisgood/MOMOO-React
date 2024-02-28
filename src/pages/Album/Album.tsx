import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import useUploadContext from '../../hooks/useUploadContext';

import BreadcrumbWrap from '../../components/Breadcrumb/BreadcrumbWrap';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import LoadingComponent from '../../components/Loading/LoadingComponent';
import FeedItem from './FeedItem';
import StyledH2 from '../../components/CommonStyled/StyledH2';
import StyledAlbum, { StyledFeedList } from './StyledAlbum';

import AddIcon from '../../asset/icon/Add_L.svg';
import TopBar from '../../components/Topbar/Topbar';
import useSetAlbumData from './useSetAlbumData';

export default function Album() {
  const [clientWitch, setClientWitch] = useState(
    document.documentElement.clientWidth,
  );

  const { album } = useParams();
  const navigate = useNavigate();

  const { setAlbumNameListToAdd, setIsUploadModalOpen } = useUploadContext();
  const { feedsData } = useSetAlbumData();

  if (!album) {
    navigate('/404');
    return;
  }

  useEffect(() => {
    window.addEventListener('resize', () => {
      setClientWitch(document.documentElement.clientWidth);
    });
  }, []);

  const openUpload = () => {
    if (album !== '전체 보기') {
      setAlbumNameListToAdd(['전체 보기', album]);
    }

    if (clientWitch > 430) {
      setIsUploadModalOpen(true);
    } else {
      navigate('/upload');
    }
  };

  return (
    <>
      <Helmet>{album && <title>{album} | MOMOO</title>}</Helmet>

      {clientWitch <= 430 && <TopBar tit={album} />}
      <StyledAlbum>
        {clientWitch > 1024 && (
          <>
            <StyledH2>{album}</StyledH2>
            <Breadcrumb
              navList={[
                { path: '/', text: 'Home' },
                { path: '', text: album },
              ]}
            />
          </>
        )}
        {clientWitch > 430 && clientWitch <= 1024 && (
          <BreadcrumbWrap
            navList={[
              { path: '/', text: 'Home' },
              { path: '', text: album },
            ]}
            title={album}
          />
        )}

        {/* 현재 앨범에 사진 추가 UI 변경하기 */}
        {/* <button type="button" aria-label="새 게시물" onClick={openUpload}>
          <img src={AddIcon} alt="추가하기" />
        </button> */}

        <section>
          <h3 className="a11y-hidden">게시글 목록</h3>
          {!feedsData && <LoadingComponent />}
          {feedsData && (
            <StyledFeedList>
              {feedsData.length > 0 &&
                feedsData.map((v) => {
                  return <FeedItem key={v.id} feedData={v}></FeedItem>;
                })}
            </StyledFeedList>
          )}
        </section>
      </StyledAlbum>
    </>
  );
}
