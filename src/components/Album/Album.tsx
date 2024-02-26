import { useEffect, useState } from 'react';
import { DocumentData } from 'firebase/firestore';

import useGetFeedData from '../../hooks/useGetFeedData';

import DeleteAlbumModal from '../Modal/DeleteAlbumModal/DeleteAlbumModal';
import { AlbumContainer, AlbumLink } from './StyledAlbum';
import AlbumMoreModal from '../../pages/Home/AlbumMoreModal';
import SharingModal from '../../pages/Home/SharingModal/SharingModal';

interface AlbumProps {
  albumData: DocumentData;
  showDeleteButton: Boolean;
}

const Album: React.FC<AlbumProps> = ({ albumData, showDeleteButton }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditAlbumModalOpen, setIsEditAlbumModalOpen] = useState(false);
  const [isSharingModalOpen, setIsSharingModalOpen] = useState(false);
  const [imgUrl, setImgUrl] = useState([]);
  const getFeedData = useGetFeedData();
  useEffect(() => {
    const lastFeedId = albumData.feedList[albumData.feedList.length - 1];

    const getData = async () => {
      if (lastFeedId !== undefined) {
        const data = await getFeedData(lastFeedId);
        setImgUrl(data?.imageUrl);
      } else {
        return;
      }
    };

    getData();
  }, []);
  const HandleModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsModalOpen(true);
  };
  const closeMoreModal = () => {
    setIsModalOpen(false);
  };
  return (
    <AlbumContainer $imageUrl={imgUrl}>
      <AlbumLink to={`/album/${albumData.name.replace(/\s+/g, '-')}`}>
        <div className="txtWrapper">
          <p className="albumTitle">{albumData.name}</p>
          <div className="CountWrapper">
            <p className="albumCount">{albumData.feedList.length}</p>
            {showDeleteButton && (
              <button type="button" onClick={HandleModal} aria-label="더보기" />
            )}
          </div>
        </div>
      </AlbumLink>

      {isModalOpen && (
        <AlbumMoreModal
          closeModal={closeMoreModal}
          setIsEditAlbumModalOpen={setIsEditAlbumModalOpen}
          setIsSharingModalOpen={setIsSharingModalOpen}
        />
      )}
      {isEditAlbumModalOpen && (
        <DeleteAlbumModal
          albumId={albumData.id}
          albumName={albumData.name}
          onClose={() => setIsEditAlbumModalOpen(false)}
        />
      )}
      {isSharingModalOpen && (
        <SharingModal closeModal={() => setIsSharingModalOpen(false)} />
      )}
    </AlbumContainer>
  );
};
export default Album;
