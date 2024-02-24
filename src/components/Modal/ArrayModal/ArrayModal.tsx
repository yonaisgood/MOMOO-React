import React, { useRef, useEffect } from 'react';

import { SelectModal, Header } from './StyledArrayModal';

import Select from '../../../asset/icon/Select.svg';

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
