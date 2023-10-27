import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BreadcrumbWrap from '../../components/Breadcrumb/BreadcrumbWrap';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import StyledMain from './StyledMain';
import StyledFeedSection from './StyledFeedSection';
import feedList from './data';
import StyledH2 from '../../components/StyledH2';
import EditIcon from '../../asset/icon/Edit.svg';

export default function Feed() {
  const [clientWitch, setClientWitch] = useState(
    document.documentElement.clientWidth,
  );
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener('resize', () => {
      setClientWitch(document.documentElement.clientWidth);
    });

    document.querySelectorAll('li').forEach((item) => {
      if (clientWitch > 430) {
        item.style.gridRowEnd = `span ${item.clientHeight + 16}`;
      } else {
        item.style.gridRowEnd = `span ${item.clientHeight + 12}`;
      }
    });
  }, []);

  const showHoverStyle = (
    e:
      | React.MouseEvent<HTMLAnchorElement>
      | React.FocusEvent<HTMLAnchorElement>,
  ) => {
    if (e.currentTarget.firstElementChild) {
      e.currentTarget.firstElementChild.className = 'hover-wrap';
    }
  };

  const hiddenHoverStyle = (
    e:
      | React.MouseEvent<HTMLAnchorElement>
      | React.FocusEvent<HTMLAnchorElement>,
  ) => {
    if (e.currentTarget.firstElementChild) {
      e.currentTarget.firstElementChild.className = 'a11y-hidden';
    }
  };

  const handleEditBtn = (id: number) => {
    navigate(`/edit/${id}`);
  };

  return (
    <StyledMain>
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
      <StyledFeedSection>
        <h3 className="a11y-hidden">게시글 목록</h3>
        <div className="btn-wrap">
          <button type="button" aria-label="리스트로 보기">
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
          <button type="button" aria-label="앨범형으로 보기">
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
        <ul>
          {feedList.map((v) => {
            return (
              <li>
                <Link
                  to={`feed/${v.id}`}
                  onMouseOver={showHoverStyle}
                  onFocus={showHoverStyle}
                  onMouseLeave={hiddenHoverStyle}
                  onBlur={hiddenHoverStyle}
                >
                  <div className="a11y-hidden">
                    <strong>{v.title}</strong>
                    <button type="button" onClick={() => handleEditBtn(v.id)}>
                      <img src={EditIcon} alt="수정하기" />
                    </button>
                  </div>
                  <img src={v.url} alt="" />
                </Link>
              </li>
            );
          })}
        </ul>
      </StyledFeedSection>
    </StyledMain>
  );
}
