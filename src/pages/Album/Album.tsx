import { useEffect, useState, useRef } from 'react';
import BreadcrumbWrap from '../../components/Breadcrumb/BreadcrumbWrap';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import StyledMain from './StyledMain';
import StyledH2 from '../../components/StyledH2';
import { useParams } from 'react-router-dom';
import useGetAlbumFeedList from '../../hooks/useGetAlbumFeedList';
import useGetFeedListData from '../../hooks/useGetFeedListData';
import { DocumentData } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import StyledGridFeed from './StyledGridFeed';
import EditIcon from '../../asset/icon/Edit.svg';
import AddIcon from '../../asset/icon/Add_L.svg';
import useEditContext from '../../hooks/useEditContext';

export default function Album() {
  const [clientWitch, setClientWitch] = useState(
    document.documentElement.clientWidth,
  );
  const ul = useRef<null | HTMLUListElement>(null);
  const { setFeedIdtoEdit, setIsEditModalOpen } = useEditContext();
  const [feedList, setFeedList] = useState<DocumentData[]>([]);
  const { id } = useParams();
  const getAlbumFeedList = useGetAlbumFeedList();
  const getFeedListData = useGetFeedListData();

  useEffect(() => {
    window.addEventListener('resize', () => {
      setClientWitch(document.documentElement.clientWidth);
    });

    (async () => {
      const feedList = await getAlbumFeedList('전체 보기');

      if (!feedList) {
        return;
      }

      const feedListData = await getFeedListData(feedList);

      if (!feedListData) {
        return;
      }

      setFeedList(feedListData);
    })();
  }, []);

  const setEditFeedContext = () => {
    // 해당 게시물 id 아큐먼트로
    setFeedIdtoEdit('');
    setIsEditModalOpen(true);
  };

  const setRowEnd = () => {
    ul.current?.querySelectorAll('li').forEach((item) => {
      if (clientWitch > 430) {
        item.style.gridRowEnd = `span ${item.clientHeight + 16}`;
      } else {
        item.style.gridRowEnd = `span ${item.clientHeight + 12}`;
      }
    });
  };

  useEffect(() => {
    setRowEnd();
  }, [clientWitch]);

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

  const setUlRef = (node: HTMLUListElement) => {
    if (ul.current === null) {
      ul.current = node;
      setRowEnd();
    }
  };
  return (
    <StyledMain>
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
      <section>
        <h3 className="a11y-hidden">게시글 목록</h3>

        <StyledGridFeed
          ref={(node) => {
            if (node) {
              setUlRef(node);
            }
          }}
        >
          {feedList.map((v) => {
            return (
              <li key={v.id}>
                <Link
                  to={`/feed/${v.id}`}
                  onMouseOver={showHoverStyle}
                  onFocus={showHoverStyle}
                  onMouseLeave={hiddenHoverStyle}
                  onBlur={hiddenHoverStyle}
                >
                  <div className="a11y-hidden">
                    <strong>{v.title}</strong>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setEditFeedContext();
                      }}
                    >
                      <img src={EditIcon} alt="수정하기" />
                    </button>
                  </div>
                  <img src={v.imageUrl[0]} alt="" />
                </Link>
              </li>
            );
          })}
          <li>
            <button
              className="upload"
              type="button"
              aria-label="새 게시물"
              onClick={setEditFeedContext}
            >
              <img src={AddIcon} alt="추가하기" />
            </button>
          </li>
        </StyledGridFeed>
      </section>
    </StyledMain>
  );
}
