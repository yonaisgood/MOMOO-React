import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import Select from '../../asset/icon/Select.svg';

const SelectModal = styled.div`
  .modal-content {
    background-color: var(--background-color);
    border-radius: 1rem;
    border: 1px solid var(--gray-200);
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
  .modal-list .selected img {
    width: 2rem;
    height: 2rem;
  }
  .modal-list button:first-child {
    border-top: 0.25rem solid var(--gray-200);
  }

  .modal-list button:hover {
    background-color: var(--gray-300);
  }
  .modal-list button:last-child:hover {
    border-bottom-left-radius: 1rem;
    border-bottom-right-radius: 1rem;
  }
`;

const Header = styled.header`
  padding: 1rem;
  border-bottom: 0.25rem solid var(--gray-200);
`;

interface ArrayModalProps {
  onClose: () => void;
  selectedOption: string | null;
  onOptionClick: (option: string) => void;
}

const ArrayModal: React.FC<ArrayModalProps> = ({
  onClose,
  selectedOption,
  onOptionClick,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  // const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (selectedOption === null) {
      onOptionClick('latest');
    }

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
  }, [selectedOption, onOptionClick]);

  return (
    <SelectModal
      className="array-modal"
      role="dialog"
      aria-labelledby="modal-select"
    >
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
          <button
            type="submit"
            onClick={() => {
              onOptionClick('latest');
              onClose();
            }}
            className={selectedOption === 'latest' ? 'selected' : ''}
          >
            최신순
            {selectedOption === 'latest' && <img src={Select} alt="선택" />}
          </button>
          <button
            type="submit"
            onClick={() => {
              onOptionClick('oldest');
              onClose();
            }}
            className={selectedOption === 'oldest' ? 'selected' : ''}
          >
            오래된순
            {selectedOption === 'oldest' && <img src={Select} alt="선택" />}
          </button>
        </div>
      </div>
    </SelectModal>
  );
};
export default ArrayModal;
