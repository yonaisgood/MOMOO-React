import { useEffect, useState } from 'react';
import BreadcrumbWrap from '../../components/Breadcrumb/BreadcrumbWrap';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import StyledMain from './StyledMain';
import StyledH2 from '../../components/StyledH2';
import GridFeed from './GridFeed';
import ListFeed from '../../components/ListFeed/ListFeed';

export default function Album() {
  const [clientWitch, setClientWitch] = useState(
    document.documentElement.clientWidth,
  );
  const [layoutOpt, setLayoutOpt] = useState('grid');

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
            <StyledH2>우정 앨범</StyledH2>
            <Breadcrumb
              navList={[
                { path: 'home', text: 'Home' },
                { path: 'album', text: 'Album' },
                { path: 'feed', text: '우정 앨범' },
              ]}
            />
          </>
        )}
        {clientWitch > 430 && clientWitch <= 1024 && (
          <BreadcrumbWrap
            navList={[
              { path: 'home', text: 'Home' },
              { path: 'album', text: 'Album' },
              { path: 'feed', text: '우정 앨범' },
            ]}
            title="우정 앨범"
          />
        )}
        <h3 className="a11y-hidden">게시글 목록</h3>
        <div className="btn-wrap">
          <button
            type="button"
            aria-label="리스트로 보기"
            onClick={() => setLayoutOpt('list')}
          >
            <svg
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect y="16" width="21" height="5" fill="#B8B8B8" />
              <rect y="8" width="21" height="5" fill="#B8B8B8" />
              <rect width="21" height="5" fill="#B8B8B8" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="격자형으로 보기"
            onClick={() => setLayoutOpt('grid')}
          >
            <svg
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="9" height="9" fill="#858585" />
              <rect y="12" width="9" height="9" fill="#858585" />
              <rect x="12" width="9" height="9" fill="#858585" />
              <rect x="12" y="12" width="9" height="9" fill="#858585" />
            </svg>
          </button>
        </div>
        {layoutOpt === 'grid' ? (
          <GridFeed />
        ) : (
          <ul>
            <li>
              <ListFeed />
            </li>
          </ul>
        )}
      </section>
    </StyledMain>
  );
}
