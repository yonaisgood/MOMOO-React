import React, { useRef, useEffect } from "react";
import styled from "styled-components";

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
    width: 25.2rem;
    height: 11.2rem;
    font-size: var(--text-l);
    overflow: hidden;
    position: relative;
  }

  .modal-list button {
    width: 50%;

    padding: 1.2rem;
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
  padding: 2.2rem;
  border-bottom: 1px solid var(--gray-200);
  text-align: center;
`;

const AlertModal = ({ onClose }: { onClose: () => void }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "Tab") {
        const focusableElements = modalRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
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
    document.addEventListener("keydown", handleKeydown);

    return () => {
      document.removeEventListener("keydown", handleKeydown);
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
            <h2 tabIndex={0}>이 게시물을 삭제하시겠어요?</h2>
          </Header>
          <div className="modal-list">
            <button type="submit" onClick={onClose} ref={closeButtonRef}>
              취소
            </button>
            <button type="submit" onClick={onClose} ref={closeButtonRef}>
              삭제
            </button>
          </div>
        </div>
      </div>
    </SelectModal>
  );
};
export default AlertModal;
