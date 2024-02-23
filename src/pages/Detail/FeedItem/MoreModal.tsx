import { useEffect, useState } from 'react';

import useEditContext from '../../../hooks/useEditContext';
import useEscDialog from '../../../hooks/dialog/useEscDialog';
import useShowModal from '../../../hooks/dialog/useShowModal';

import {
  StyledDialog,
  Header,
} from '../../../components/Modal/StyledMoreModal';

import Close from '../../../asset/icon/X-Small.svg';
import { useNavigate, useParams } from 'react-router-dom';
import { closeDialogOnClick } from '../../../utils/dialog';

interface Props {
  closeModal: () => void;
  setDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setChangeAlbumModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MoreModal({
  closeModal,
  setDeleteModalOpen,
  setChangeAlbumModalOpen,
}: Props) {
  const [clientWitch, setClientWitch] = useState(
    document.documentElement.clientWidth,
  );

  const { setFeedIdToEdit, setIsEditModalOpen } = useEditContext();
  const { showModal } = useShowModal();
  useEscDialog(closeModal);

  const navigate = useNavigate();
  const { id } = useParams();

  if (!id) {
    navigate('/404');
    return;
  }

  useEffect(() => {
    window.addEventListener('resize', () => {
      setClientWitch(document.documentElement.clientWidth);
    });
  }, []);

  const handleDeleteFeed = () => {
    setDeleteModalOpen(true);
    closeModal();
  };

  const handleChangeAlbumModal = () => {
    setChangeAlbumModalOpen(true);
    closeModal();
  };

  const goToEditFeed = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (clientWitch > 430) {
      setFeedIdToEdit(id);
      setIsEditModalOpen(true);
      closeModal();
    } else {
      navigate(`/edit/${id}`);
    }
  };

  return (
    <StyledDialog
      aria-labelledby="modal-select"
      ref={showModal}
      onClick={(e) => closeDialogOnClick(e, closeModal)}
    >
      <div className="modal-content" role="document">
        <Header className="modal-header" id="modal-select">
          <h2>게시글 변경</h2>
        </Header>
        <div className="modal-list">
          <button type="button" onClick={handleDeleteFeed}>
            삭제하기
          </button>
          <button type="button" onClick={goToEditFeed}>
            수정하기
          </button>
          <button type="button" onClick={handleChangeAlbumModal}>
            앨범 변경하기
          </button>
        </div>
        <button type="button" className="close-button" onClick={closeModal}>
          <img src={Close} alt="모달 닫기 버튼" />
        </button>
      </div>
    </StyledDialog>
  );
}
