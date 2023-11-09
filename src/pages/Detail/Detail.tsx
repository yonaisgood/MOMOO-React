import { DetailLayout } from './DetailStyle';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import ListFeed from '../../components/ListFeed/ListFeed';

function Detail() {
  return (
    <DetailLayout>
      <Breadcrumb
        navList={[
          { path: 'home', text: 'Home' },
          { path: 'album', text: 'album' },
          { path: 'feed', text: 'feed' },
        ]}
      />
      <section>
        <ListFeed />
      </section>
    </DetailLayout>
  );
}

export default Detail;
