import { useRef, useEffect, useState } from 'react';

import useAddAlbum from '../../../hooks/useAddAlbum';

import { SelectModal, Header } from './StyledNewAlbumModal';
import ModalOverlay from '../../CommonStyled/StyledModalOverlay';

const NewAlbumModal = ({ onClose }: { onClose: () => void }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [albumName, setAlbumName] = useState('');
  const [errMessage, setErrMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const addAlbum = useAddAlbum();

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleAlbum = async () => {
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      if (albumName.trim().length < 1 || albumName.trim().length > 20) {
        setErrMessage('1자에서 20자 사이로 입력해 주세요');
        return;
      }

      const result = await addAlbum({ albumName });

      if (!result.success) {
        setErrMessage(result.error!);
        return;
      }

      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SelectModal role="dialog" aria-labelledby="modal-select">
      <ModalOverlay>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAlbum();
          }}
        >
          <div
            className="modal-content"
            role="document"
            tabIndex={-1}
            ref={modalRef}
          >
            <Header className="modal-header" id="modal-select">
              <h2 tabIndex={0}>새로운 앨범</h2>
              <p>이 앨범의 이름을 입력해주세요</p>
              <input
                type="text"
                placeholder="이름을 입력해주세요"
                value={albumName}
                onChange={(e) => setAlbumName(e.target.value)}
              />
              <strong role="alert">{errMessage && `*${errMessage}`}</strong>
            </Header>
            <div className="modal-list">
              <button type="button" onClick={onClose} ref={closeButtonRef}>
                취소
              </button>
              <button
                type="submit"
                onClick={handleAlbum}
                ref={closeButtonRef}
                disabled={isSubmitting}
              >
                저장
              </button>
            </div>
          </div>
        </form>
      </ModalOverlay>
    </SelectModal>
  );
};
export default NewAlbumModal;
