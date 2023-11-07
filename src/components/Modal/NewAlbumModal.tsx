import { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import useAddAlbum from '../../hooks/useAddAlbum';

const SelectModal = styled.div`
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
  }

  .modal-content {
    background: var(--background-color);
    border-radius: 1rem;
    width: 23rem;
    height: 20rem;
    font-size: var(--text-l);
    overflow: hidden;
    position: relative;
  }

  .modal-list button {
    width: 50%;
    padding: 1rem 1.6rem;
    font-size: var(--text-m);
    transition: all 0.2s ease-in-out;
  }
  .modal-list button:first-child {
    border-right: 1px solid var(--gray-200);
  }

  .modal-list button:hover {
    color: var(--point-color);
  }
`;

const Header = styled.header`
  padding: 2rem 1.6rem;
  border-bottom: 1px solid var(--gray-200);
  text-align: center;

  h2 {
    font-size: 1.6rem;
  }
  p {
    font-size: 1.2rem;
    margin-bottom: 3.3rem;
    color: var(--gray-600);
  }
  input {
    display: block;
    width: 19.8rem;
    height: 3.9rem;
    padding: 2rem 1rem;
    border: 1px solid var(--gray-200, #d2d2d2);

    &::placeholder {
      font-size: 1.2rem;
      color: var(--gray-600);
      margin-left: 1rem;
    }
  }
`;

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
