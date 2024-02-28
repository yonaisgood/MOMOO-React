import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { DocumentData } from 'firebase/firestore';

import useEditContext from '../../hooks/useEditContext';
import useSetFeedItemLayout from './useSetFeedItemLayout';

import { StyledFeedItem } from './StyledAlbum';

import EditIcon from '../../asset/icon/Edit.svg';
import useAuthContext from '../../hooks/useAuthContext';

export default function FeedItem({ feedData }: { feedData: DocumentData }) {
  const [clientWitch, setClientWitch] = useState(
    document.documentElement.clientWidth,
  );

  const { user } = useAuthContext();
  const { setFeedIdToEdit, setIsEditModalOpen } = useEditContext();
  const { imgRatio, setRatio, setGridRowEnd } = useSetFeedItemLayout();

  const navigate = useNavigate();
  const { uid, album } = useParams();

  if (!uid || !album) {
    navigate('404');
    return;
  }

  useEffect(() => {
    setRatio(feedData.imageUrl[0]);

    window.addEventListener('resize', () => {
      setClientWitch(document.documentElement.clientWidth);
    });
  }, []);

  const setEditFeedContext = (feedId: string) => {
    setFeedIdToEdit(feedId);
    setIsEditModalOpen(true);
  };

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

  return (
    <>
      {imgRatio.width && imgRatio.height && (
        <StyledFeedItem
          key={feedData.id}
          ref={(node) => {
            if (node) {
              setGridRowEnd(node);
            }
          }}
        >
          <Link
            to={`/${uid}/${album}/p/${feedData.id}`}
            onMouseOver={showHoverStyle}
            onFocus={showHoverStyle}
            onMouseLeave={hiddenHoverStyle}
            onBlur={hiddenHoverStyle}
          >
            <div className="a11y-hidden">
              <strong>{feedData.title}</strong>
              {uid === user?.uid && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();

                    if (clientWitch > 430) {
                      setEditFeedContext(feedData.id);
                    } else {
                      navigate(`/edit/${album}`);
                    }
                  }}
                >
                  <img src={EditIcon} alt="수정하기" />
                </button>
              )}
            </div>
            <img src={feedData.imageUrl[0]} alt="" />
          </Link>
        </StyledFeedItem>
      )}
    </>
  );
}
