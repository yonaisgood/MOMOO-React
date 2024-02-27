import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';

import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import FeedItem from './FeedItem/FeedItem';
import TopBar from '../../components/Topbar/Topbar';
import DetailLayout from './StyledDetail';

interface NavItem {
  path: string;
  text: string;
}

export default function Detail() {
  const [clientWitch, setClientWitch] = useState(
    document.documentElement.clientWidth,
  );
  const [navList, setNavList] = useState<null | NavItem[]>(null);

  const { album } = useParams();

  if (!album) {
    return; // 404로 라우팅 됨
  }

  useEffect(() => {
    window.addEventListener('resize', () => {
      setClientWitch(document.documentElement.clientWidth);
    });

    const albumName = album.replace(/-/gi, ' ');

    const navListToSet = [
      { path: '/', text: 'Home' },
      { path: `/${album}`, text: albumName },
      { path: '', text: 'feed' },
    ];

    setNavList(navListToSet);
  }, []);

  return (
    <>
      <Helmet>
        <title>게시물 | MOMOO</title>
      </Helmet>

      {clientWitch <= 430 && <TopBar tit="게시물" />}
      <DetailLayout>
        {navList && clientWitch > 430 && <Breadcrumb navList={navList} />}
        <section>
          <FeedItem />
        </section>
      </DetailLayout>
    </>
  );
}
