import MoreModal from '../../components/Modal/MoreModal/MoreModal';

interface Props {
  closeModal: () => void;
  setEditAlbumModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSharingModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AlbumMoreModal({
  closeModal,
  setEditAlbumModalOpen,
  setSharingModalOpen,
}: Props) {
  const openEditAlbumModal = () => {
    setEditAlbumModalOpen(true);
    closeModal();
  };

  const openSharingModalOpen = () => {
    setSharingModalOpen(true);
    closeModal();
  };

  return (
    <MoreModal
      title="게시물 변경"
      closeModal={closeModal}
      btnList={[
        {
          name: '수정하기',
          clickEventListener: openEditAlbumModal,
        },
        {
          name: '공유 대상',
          clickEventListener: openSharingModalOpen,
        },
      ]}
    />
  );
}
