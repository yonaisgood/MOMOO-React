import React, { useState } from 'react';

import useEditAlbum from '../../../hooks/useEditAlbum';
import useDeleteAlbum from '../../../hooks/useDeleteAlbum';
import useEscDialog from '../../../hooks/dialog/useEscDialog';
import useShowModal from '../../../hooks/dialog/useShowModal';

import LoadingComponent from '../../Loading/LoadingComponent';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import AlertModal from '../AlertModal/AlertModal';
import { StyledDlelteAlbumDialog, Header } from './StyledDeleteAlbumModal';

import { closeDialogOnClick } from '../../../utils/dialog';

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
  const [editAlbumName, setEditAlbumName] = useState(albumName);
  const [errMessage, setErrMessage] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const editAlbum = useEditAlbum();
  const { deleteAlbum, isPending, error } = useDeleteAlbum();
  const { showModal } = useShowModal();
  useEscDialog(onClose);

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

  const handleDeleteAlbum = () => {
    setShowConfirmModal(true);
  };

  const handleDeleteSuccess = async () => {
    await deleteAlbum({ albumId });
    if (error) {
      setShowConfirmModal(false);
      return <AlertModal message={'삭제를 실패하였습니다'} onClose={onClose} />;
    }
    setShowConfirmModal(false);
  };

  return (
    <>
      <StyledDlelteAlbumDialog
        role="dialog"
        aria-labelledby="modal-select"
        ref={showModal}
        onClick={(e) => closeDialogOnClick(e, onClose)}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleEditAlbum();
          }}
        >
          <Header className="modal-header" id="modal-select">
            <h2>Edit Album</h2>
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
            {errMessage !== '' && <strong role="alert">*{errMessage}</strong>}
            <button type="button" onClick={handleDeleteAlbum}>
              Delete
              <img src={DeleteRedImg} alt="휴지통 아이콘" />
            </button>
          </div>
          <button onClick={handleEditAlbum} className="edit-btn" type="submit">
            <img src={SelectImg} alt="수정" />
          </button>
          <button className="close-button" onClick={onClose}>
            <img src={Close} alt="모달 닫기 버튼" />
          </button>
        </form>
      </StyledDlelteAlbumDialog>
      {showConfirmModal && (
        <ConfirmModal
          onClose={() => setShowConfirmModal(false)}
          handleAgreeBtn={handleDeleteSuccess}
          title={`앨범을 정말 삭제하시겠습니까?`}
          btnNameList={['취소', '확인']}
        />
      )}
      {isPending && <LoadingComponent />}
    </>
  );
};
export default DeleteAlbumModal;
