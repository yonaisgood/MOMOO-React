import { useRef, useEffect, useState } from 'react';

import useEditContext from '../../../hooks/useEditContext';

import { SelectModal, Header } from './StyledSelectModal';
import ModalOverlay from '../../CommonStyled/StyledModalOverlay';

import Close from '../../../asset/icon/X-Small.svg';
import { useNavigate, useParams } from 'react-router-dom';

interface Props {
  onClose: () => void;
  setDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setChangeAlbumModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal = ({
  onClose,
  setDeleteModalOpen,
  setChangeAlbumModalOpen,
}: Props) => {
  const [clientWitch, setClientWitch] = useState(
    document.documentElement.clientWidth,
  );

  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const { setFeedIdToEdit, setIsEditModalOpen } = useEditContext();

  const navigate = useNavigate();
  const { id } = useParams();

  if (!id) {
    navigate('/404');
    return;
  }

  useEffect(() => {
    window.addEventListener('resize', () => {
      setClientWitch(document.documentElement.clientWidth);
    });
  }, []);

  const handleDeleteFeed = () => {
    setDeleteModalOpen(true);
    onClose();
  };

  const handleChangeAlbumModal = () => {
    setChangeAlbumModalOpen(true);
    onClose();
  };

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

  const goToEditFeed = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (clientWitch > 430) {
      setFeedIdToEdit(id);
      setIsEditModalOpen(true);
      onClose();
    } else {
      navigate(`/edit/${id}`);
    }
  };

  return (
    <SelectModal role="dialog" aria-labelledby="modal-select">
      <ModalOverlay>
        <div
          className="modal-content"
          role="document"
          tabIndex={-1}
          ref={modalRef}
        >
          <Header className="modal-header" id="modal-select">
            <h2 tabIndex={0}>게시글 변경</h2>
          </Header>
          <div className="modal-list">
            <button type="button" onClick={handleDeleteFeed}>
              삭제하기
            </button>
            <button type="button" onClick={goToEditFeed}>
              수정하기
            </button>
            <button type="button" onClick={handleChangeAlbumModal}>
              앨범 변경하기
            </button>
          </div>
          <button
            type="button"
            className="close-button"
            onClick={onClose}
            tabIndex={0}
            ref={closeButtonRef}
          >
            <img src={Close} alt="모달 닫기 버튼" />
          </button>
        </div>
      </ModalOverlay>
    </SelectModal>
  );
};
export default Modal;
