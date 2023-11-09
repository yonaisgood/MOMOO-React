import { DetailLayout } from './DetailStyle';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import ListFeed from '../../components/ListFeed/ListFeed';
import { useEffect, useState } from 'react';

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
  );
}

export default Detail;
