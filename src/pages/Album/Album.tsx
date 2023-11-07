import { useEffect, useState } from 'react';
import BreadcrumbWrap from '../../components/Breadcrumb/BreadcrumbWrap';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import StyledMain from './StyledMain';
import StyledH2 from '../../components/StyledH2';
import GridFeed from './GridFeed';
import { useParams } from 'react-router-dom';

export default function Album() {
  const [clientWitch, setClientWitch] = useState(
    document.documentElement.clientWidth,
  );
  const { id } = useParams();

  useEffect(() => {
    window.addEventListener('resize', () => {
      setClientWitch(document.documentElement.clientWidth);
    });
  }, []);

  return (
    <StyledMain>
      <section>
        {clientWitch > 1024 && (
          <>
            <StyledH2>{id}</StyledH2>
            <Breadcrumb
              navList={[
                { path: 'home', text: 'Home' },
                { path: 'feed', text: id || '' },
              ]}
            />
          </>
        )}
        {clientWitch > 430 && clientWitch <= 1024 && (
          <BreadcrumbWrap
            navList={[
              { path: 'home', text: 'Home' },
              { path: 'feed', text: id || '' },
            ]}
            title={id || ''}
          />
        )}
        <h3 className="a11y-hidden">게시글 목록</h3>
        <GridFeed />
      </section>
    </StyledMain>
  );
}
