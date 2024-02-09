import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

import usePageContext from '../../hooks/usePageContext';

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
  const { setPrevPath, prevPath } = usePageContext();

  useEffect(() => {
    window.addEventListener('resize', () => {
      setClientWitch(document.documentElement.clientWidth);
    });

    const navListToSet = [
      { path: '/', text: 'Home' },
      { path: '//', text: 'feed' },
    ];

    if (prevPath) {
      navListToSet.splice(1, 0, {
        path: `/album/${prevPath}`,
        text: prevPath.replace(/-/gi, ' '),
      });
    }

    setNavList(navListToSet);

    return () => setPrevPath(null);
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
