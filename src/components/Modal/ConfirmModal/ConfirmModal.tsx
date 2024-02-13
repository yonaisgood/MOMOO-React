import { useRef, useEffect } from 'react';

import { ConfirmModalWrap, Header } from './StyledConfirmModal';
import ModalOverlay from '../../CommonStyled/StyledModalOverlay';

export default function ConfirmModal({
  onClose,
  handleAgreeBtn,
  title,
  btnNameList,
}: {
  onClose: () => void;
  handleAgreeBtn: () => void;
  title: string;
  btnNameList: string[];
}) {
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
    <ConfirmModalWrap role="dialog" aria-labelledby="modal-select">
      <ModalOverlay>
        <div
          className="modalContent"
          role="document"
          tabIndex={-1}
          ref={modalRef}
        >
          <Header className="modal-header" id="modal-select">
            <h2 tabIndex={0}>{title}</h2>
          </Header>
          <div className="modalList">
            <button type="button" onClick={onClose} ref={closeButtonRef}>
              {btnNameList[0]}
            </button>
            <button type="button" onClick={handleAgreeBtn}>
              {btnNameList[1]}
            </button>
          </div>
        </div>
      </ModalOverlay>
    </ConfirmModalWrap>
  );
}
