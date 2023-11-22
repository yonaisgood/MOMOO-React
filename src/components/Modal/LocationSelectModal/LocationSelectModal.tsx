import { useRef, useEffect } from 'react';

import { SelectModal, Header } from './StyledLocationSelectModal';

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
