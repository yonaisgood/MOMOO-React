import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import Close from '../../asset/icon/X-Small.svg';

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
    border-radius: 10px;
    width: 30rem;
    font-size: var(--text-l);
    overflow: hidden;
    position: relative;
  }

  .close-button {
    position: absolute;
    top: 1.8rem;
    right: 1.6rem;
  }

  .modal-list button {
    text-align: start;
    width: 100%;
    border-bottom: 1px solid var(--gray-200);
    padding: 1.3rem 1.6rem;
    font-size: var(--text-m);
    transition: all 0.2s ease-in-out;
  }

  .modal-list button:hover {
    background: var(--point-color);
  }
`;

const Header = styled.header`
  padding: 1.4rem 1.6rem;
  border-bottom: 1px solid var(--gray-200);
  text-align: center;
`;

const Modal = ({ onClose }: { onClose: () => void }) => {
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
            <h2 tabIndex={0}>게시글 변경</h2>
          </Header>
          <div className="modal-list">
            <button type="submit">삭제하기</button>
            <button type="submit">수정하기</button>
            <button type="submit">앨범 변경하기</button>
            <button type="submit">공유하기</button>
          </div>
          <button
            className="close-button"
            onClick={onClose}
            tabIndex={0}
            ref={closeButtonRef}
          >
            <img src={Close} alt="모달 닫기 버튼" />
          </button>
        </div>
      </div>
    </SelectModal>
  );
};
export default Modal;
