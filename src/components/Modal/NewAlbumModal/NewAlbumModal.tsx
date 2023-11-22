import { useRef, useEffect, useState } from 'react';

import useAddAlbum from '../../../hooks/useAddAlbum';

import { SelectModal, Header } from './StyledNewAlbumModal';

const NewAlbumModal = ({ onClose }: { onClose: () => void }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [albumName, setAlbumName] = useState('');
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

  const handleAlbum = async () => {
    await addAlbum({ albumName });
    onClose();
  };

  return (
    <SelectModal role="dialog" aria-labelledby="modal-select">
      <div className="modal-overlay">
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
              onChange={(e) => setAlbumName(e.target.value)}
            />
          </Header>
          <div className="modal-list">
            <button type="submit" onClick={onClose} ref={closeButtonRef}>
              취소
            </button>
            <button type="submit" onClick={handleAlbum} ref={closeButtonRef}>
              저장
            </button>
          </div>
        </div>
      </div>
    </SelectModal>
  );
};
export default NewAlbumModal;
