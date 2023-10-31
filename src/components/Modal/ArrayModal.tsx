import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import Select from '../../asset/icon/Select.svg';

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
    width: 19.6rem;
    font-size: var(--text-s);
  }

  .modal-list button {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 1rem;
    text-align: start;
    font-size: var(--text-m);
    transition: all 0.2s ease-in-out;
  }
  .modal-list button img {
    display: none;
    width: 2rem;
    height: 2rem;
  }
  .modal-list button:first-child {
    border-top: 0.25rem solid var(--gray-200);
  }

  .modal-list button:hover {
    background-color: var(--gray-300);
    img {
      display: block;
    }
  }
  .modal-list button:focus {
    img {
      display: block;
    }
  }
`;

const Header = styled.header`
  padding: 1rem;
  border-bottom: 0.25rem solid var(--gray-200);
`;

const ArrayModal = ({ onClose }: { onClose: () => void }) => {
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
            <h2 tabIndex={0}>정렬기준</h2>
          </Header>
          <div className="modal-list">
            <button type="submit" onClick={onClose} ref={closeButtonRef}>
              최신순
              <img src={Select} alt="선택" />
            </button>
            <button type="submit" onClick={onClose} ref={closeButtonRef}>
              오래된순
              <img src={Select} alt="선택" />
            </button>
          </div>
        </div>
      </div>
    </SelectModal>
  );
};
export default ArrayModal;
