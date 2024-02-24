import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import useEditContext from '../../../hooks/useEditContext';

import MoreModal from '../../../components/Modal/MoreModal/MoreModal';

interface Props {
  closeModal: () => void;
  setDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setChangeAlbumModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function FeedMoreModal({
  closeModal,
  setDeleteModalOpen,
  setChangeAlbumModalOpen,
}: Props) {
  const [clientWitch, setClientWitch] = useState(
    document.documentElement.clientWidth,
  );

  const { setFeedIdToEdit, setIsEditModalOpen } = useEditContext();

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

  const goToEditFeed = () => {
    if (clientWitch > 430) {
      setFeedIdToEdit(id);
      setIsEditModalOpen(true);
      closeModal();
    } else {
      navigate(`/edit/${id}`);
    }
  };

  return (
    <MoreModal
      title="게시물 변경"
      closeModal={closeModal}
      btnList={[
        {
          name: '삭제하기',
          clickEventListener: handleDeleteFeed,
        },
        {
          name: '수정하기',
          clickEventListener: goToEditFeed,
        },
        {
          name: '앨범 변경하기',
          clickEventListener: handleChangeAlbumModal,
        },
      ]}
    />
  );
}
