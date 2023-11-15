import { useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { appFireStore } from '../../firebase/config';
import styled from 'styled-components';
import useAuthContext from '../../hooks/useAuthContext';
import { doc, deleteDoc } from 'firebase/firestore';
import useGetSavedAlbumList from '../../hooks/useGetSavedAlbumList';
import { useremoveFeedIdFromFeedList } from '../../hooks/useUpdateFeedList';

const AlertModalWrap = styled.div`
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
  }
  .modalContent {
    background: var(--background-color);
    border-radius: 1rem;
    width: 25.2rem;
    height: 11.2rem;
    font-size: var(--text-l);
    overflow: hidden;
    position: relative;
  }

  .modalList {
    button {
      width: 50%;
      text-align: center;
      padding: 1.2rem;
      font-size: var(--text-m);
      transition: all 0.2s ease-in-out;
    }

    button:first-child {
      border-right: 1px solid var(--gray-200);
    }

    button:hover {
      background-color: var(--point-color);
    }
  }
`;

const Header = styled.header`
  padding: 2.2rem;
  border-bottom: 1px solid var(--gray-200);
  text-align: center;
`;

const AlertModal = ({ onClose }: { onClose: () => void }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const getSavedAlbumList = useGetSavedAlbumList();
  const removeFeedIdFromFeedList = useremoveFeedIdFromFeedList();

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
          getAlbumList.forEach((albumId: string) => {
            removeFeedIdFromFeedList(id, albumId);
          });
        }
        onClose();
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
