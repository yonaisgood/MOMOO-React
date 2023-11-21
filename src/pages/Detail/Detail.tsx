import { useEffect, useState } from 'react';

import usePageContext from '../../hooks/usePageContext';

import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import FeedItem from '../../components/FeedItem/FeedItem';
import TopBar from '../../components/Topbar/Topbar';
import DetailLayout from './StyledDetail';

function Detail() {
  const [clientWitch, setClientWitch] = useState(
    document.documentElement.clientWidth,
  );
  const { setPrevPath, prevPath } = usePageContext();

  useEffect(() => {
    window.addEventListener('resize', () => {
      setClientWitch(document.documentElement.clientWidth);
    });

    return () => setPrevPath(null);
  }, []);

  const navList = [{ path: 'home', text: 'Home' }];

  if (prevPath) {
    navList.push({
      path: `album/${prevPath.replace(/-/gi, ' ')}`,
      text: prevPath,
    });
  }
  navList.push({ path: '/', text: 'feed' });

  return (
    <>
      {clientWitch <= 430 && <TopBar tit="게시물" />}
      <DetailLayout>
        {clientWitch > 430 && <Breadcrumb navList={navList} />}
        <section>
          <FeedItem />
        </section>
      </DetailLayout>
    </>
  );
}

export default Detail;
