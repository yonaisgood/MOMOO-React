import { useRef, useEffect } from 'react';
import styled from 'styled-components';

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
    background-color: var(--background-color);
    border-radius: 1rem;
    width: 32rem;
    height: 17.2rem;
    font-size: var(--text-s);
  }

  .modal-list button {
    width: 100%;
    padding: 0.9rem 1.6rem;
    text-align: start;
    font-size: var(--text-s);
    transition: all 0.2s ease-in-out;
  }
  .modal-list button p:last-child {
    color: var(--gray-700);
  }
  .modal-list button:hover {
    background-color: var(--point-color);
  }
`;

const Header = styled.header`
  padding: 1.8rem 1.6rem;
`;

const LocationSelectModal = ({ onClose }: { onClose: () => void }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

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
            <h2 tabIndex={0}>서울</h2>
          </Header>
          <div className="modal-list">
            <button type="submit" onClick={onClose} ref={closeButtonRef}>
              <p>서울랜드</p>
              <p>경기 과천시 광명로 181</p>
            </button>
            <button type="submit" onClick={onClose} ref={closeButtonRef}>
              <p>서울랜드</p>
              <p>경기 과천시 광명로 181</p>
            </button>
          </div>
        </div>
      </div>
    </SelectModal>
  );
};
export default LocationSelectModal;
