import { useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { appFireStore } from '../../../firebase/config';
import { doc, deleteDoc, DocumentData } from 'firebase/firestore';

import useAuthContext from '../../../hooks/useAuthContext';
import useGetSavedAlbumList from '../../../hooks/useGetSavedAlbumList';
import { useRemoveFeedIdFromFeedList } from '../../../hooks/useUpdateFeedList';

import { AlertModalWrap, Header } from './StyledAlertModal';
import { deleteImg } from '../../../SDKUtiles';

const AlertModal = ({
  onClose,
  imgUrlList,
}: {
  onClose: () => void;
  imgUrlList: string[];
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const getSavedAlbumList = useGetSavedAlbumList();
  const removeFeedIdFromFeedList = useRemoveFeedIdFromFeedList();
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        const focusableElements = modalRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        if (focusableElements) {
          const firstElement = focusableElements[0] as HTMLElement;
          const lastElement = focusableElements[
            focusableElements.length - 1
          ] as HTMLElement;
          if (event.shiftKey && document.activeElement === firstElement) {
            lastElement.focus();
            event.preventDefault();
          } else if (
            !event.shiftKey &&
            document.activeElement === lastElement
          ) {
            firstElement.focus();
            event.preventDefault();
          }
        }
      }
    };
    document.addEventListener('keydown', handleKeydown);

    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, []);

  const { id } = useParams();
  const { user } = useAuthContext();

  if (!id) {
    return;
  }

  const handleDeletePost = async () => {
    if (user) {
      const postDocRef = doc(appFireStore, user.uid, user.uid, 'feed', id);

      try {
        await deleteDoc(postDocRef);
        const getAlbumList = await getSavedAlbumList(id);

        if (getAlbumList !== undefined) {
          getAlbumList.forEach((albumDoc: DocumentData) => {
            removeFeedIdFromFeedList(id, albumDoc.id);
          });
        }

        navigate(-1);

        imgUrlList.forEach(async (url) => await deleteImg(url));
      } catch (error) {
        console.error('게시글 삭제 오류:', error);
      }
    } else {
      console.error('사용자가 로그인되지 않았습니다.');
    }
  };

  return (
    <AlertModalWrap role="dialog" aria-labelledby="modal-select">
      <div className="modal-overlay">
        <div
          className="modalContent"
          role="document"
          tabIndex={-1}
          ref={modalRef}
        >
          <Header className="modal-header" id="modal-select">
            <h2 tabIndex={0}>이 게시물을 삭제하시겠어요?</h2>
          </Header>
          <div className="modalList">
            <button type="button" onClick={onClose} ref={closeButtonRef}>
              취소
            </button>
            <button type="button" onClick={handleDeletePost}>
              삭제
            </button>
          </div>
        </div>
      </div>
    </AlertModalWrap>
  );
};
export default AlertModal;
