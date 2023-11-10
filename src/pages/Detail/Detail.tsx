import { DetailLayout } from './DetailStyle';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import ListFeed from '../../components/ListFeed/ListFeed';
import { useEffect, useState } from 'react';
import TopBar from '../../components/Topbar/Topbar';

function Detail() {
  const [clientWitch, setClientWitch] = useState(
    document.documentElement.clientWidth,
  );

  useEffect(() => {
    window.addEventListener('resize', () => {
      setClientWitch(document.documentElement.clientWidth);
    });
  }, []);

  return (
    <>
      <TopBar tit="게시물" />
      <DetailLayout>
        {clientWitch > 430 && (
          <Breadcrumb
            navList={[
              { path: 'home', text: 'Home' },
              { path: 'album', text: 'album' },
              { path: 'feed', text: 'feed' },
            ]}
          />
        )}
        <section>
          <ListFeed />
        </section>
      </DetailLayout>
    </>
  );
}

export default Detail;
