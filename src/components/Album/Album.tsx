import { useEffect, useState } from 'react';
import { DocumentData } from 'firebase/firestore';

import useGetFeedData from '../../hooks/useGetFeedData';

import DeleteAlbumModal from '../Modal/DeleteAlbumModal/DeleteAlbumModal';
import { AlbumContainer, AlbumLink } from './StyledAlbum';
import AlbumMoreModal from '../../pages/Home/AlbumMoreModal';
import SharingModal from '../../pages/Home/SharingModal/SharingModal';
import useAuthContext from '../../hooks/useAuthContext';

interface AlbumProps {
  albumData: DocumentData;
  showDeleteButton: Boolean;
}

const Album: React.FC<AlbumProps> = ({ albumData, showDeleteButton }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditAlbumModalOpen, setIsEditAlbumModalOpen] = useState(false);
  const [isSharingModalOpen, setIsSharingModalOpen] = useState(false);
  const [imgUrl, setImgUrl] = useState([]);

  const { user } = useAuthContext();
  const getFeedData = useGetFeedData();

  if (!user) {
    return;
  }

  useEffect(() => {
    const lastFeedId = albumData.feedList[albumData.feedList.length - 1];

    const getData = async () => {
      if (lastFeedId !== undefined) {
        const data = albumData.uid
          ? await getFeedData(lastFeedId, albumData.uid)
          : await getFeedData(lastFeedId);

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
      <AlbumLink to={`/${albumData.uid || user.uid}/${albumData.name}`}>
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
        <SharingModal
          albumId={albumData.id}
          closeModal={() => setIsSharingModalOpen(false)}
        />
      )}
    </AlbumContainer>
  );
};
export default Album;
