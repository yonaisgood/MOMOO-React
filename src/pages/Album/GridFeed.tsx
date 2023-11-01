import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import StyledGridFeed from './StyledGridFeed';
import feedList from './data';
import EditIcon from '../../asset/icon/Edit.svg';
import Upload from '../../components/Upload/Upload';
import AddIcon from '../../asset/icon/Add_L.svg';

export default function GridFeed() {
  const [clientWitch, setClientWitch] = useState(
    document.documentElement.clientWidth,
  );
  const ul = useRef<null | HTMLUListElement>(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    window.addEventListener('resize', () => {
      setClientWitch(document.documentElement.clientWidth);
    });
  }, []);

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

  const handleEditBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOpenModal(true);
  };

  const setUlRef = (node: HTMLUListElement) => {
    if (ul.current === null) {
      ul.current = node;
      setRowEnd();
    }
  };

  return (
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
                <button type="button" onClick={handleEditBtn}>
                  <img src={EditIcon} alt="수정하기" />
                </button>
              </div>
              <img src={v.url} alt="" />
            </Link>
            {openModal && (
              <div className="modal-overlay">
                <Upload setOpenPopup={setOpenModal} id={`${v.id}`} />
              </div>
            )}
          </li>
        );
      })}
      <li>
        <button
          className="upload"
          type="button"
          aria-label="새 게시물"
          onClick={() => setOpenModal(true)}
        >
          <img src={AddIcon} alt="추가하기" />
        </button>
        {openModal && <Upload setOpenPopup={setOpenModal} album="우정 앨범" />}
      </li>
    </StyledGridFeed>
  );
}
