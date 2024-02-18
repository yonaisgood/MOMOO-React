import React, { useRef, useEffect, useState } from 'react';

import useEditAlbum from '../../../hooks/useEditAlbum';
import useDeleteAlbum from '../../../hooks/useDeleteAlbum';

import { SelectModal, Header } from './StyledDeleteAlbumModal';
import ModalOverlay from '../../CommonStyled/StyledModalOverlay';

import Close from '../../../asset/icon/X.svg';
import SelectImg from '../../../asset/icon/Select.svg';
import DeleteRedImg from '../../../asset/icon/DeleteRed.svg';

interface DeleteAlbumModalProps {
  onClose: () => void;
  albumName: string;
  albumId: string;
}
const DeleteAlbumModal: React.FC<DeleteAlbumModalProps> = ({
  onClose,
  albumName,
  albumId,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [editAlbumName, setEditAlbumName] = useState(albumName);
  const [errMessage, setErrMessage] = useState('');
  const editAlbum = useEditAlbum();
  const deleteAlbum = useDeleteAlbum();

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

  const handleEditAlbum = async () => {
    if (editAlbumName.trim() === '') {
      setErrMessage('제목을 입력해 주세요');
      return;
    }
    const result = await editAlbum({ editAlbumName, albumId });
    if (!result.success) {
      setErrMessage(result.error!);
      return;
    }
    onClose();
  };
  const handleDeleteAlbum = async () => {
    await deleteAlbum({ albumId });
    onClose();
  };
  return (
    <SelectModal role="dialog" aria-labelledby="modal-select">
      <ModalOverlay>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleEditAlbum();
          }}
        >
          <div
            className="modal-content"
            role="document"
            tabIndex={-1}
            ref={modalRef}
          >
            <Header className="modal-header" id="modal-select">
              <h2 tabIndex={0}>Edit Album</h2>
            </Header>
            <div className="modal-list">
              <p>이름</p>
              <input
                type="text"
                value={editAlbumName}
                onChange={(e) => {
                  setEditAlbumName(e.target.value);
                }}
                placeholder="새로운 앨범명을 입력해주세요"
              />
              <strong role="alert">{errMessage && `*${errMessage}`}</strong>
              <button type="button" onClick={handleDeleteAlbum}>
                Delete
                <img src={DeleteRedImg} alt="휴지통 아이콘" />
              </button>
            </div>
            <button
              onClick={handleEditAlbum}
              className="edit-btn"
              type="submit"
            >
              <img src={SelectImg} alt="수정" />
            </button>
            <button
              className="close-button"
              onClick={onClose}
              tabIndex={0}
              ref={closeButtonRef}
            >
              <img src={Close} alt="모달 닫기 버튼" />
            </button>
          </div>
        </form>
      </ModalOverlay>
    </SelectModal>
  );
};
export default DeleteAlbumModal;
