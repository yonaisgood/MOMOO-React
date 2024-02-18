import { useEffect, useState } from 'react';
import { DocumentData } from 'firebase/firestore';

import useGetFeedData from '../../hooks/useGetFeedData';

import DeleteAlbumModal from '../Modal/DeleteAlbumModal/DeleteAlbumModal';
import { AlbumContainer, AlbumLink } from './StyledAlbum';

interface AlbumProps {
  albumData: DocumentData;
  showDeleteButton: Boolean;
}

const Album: React.FC<AlbumProps> = ({ albumData, showDeleteButton }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
  const HandleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <AlbumContainer $imageUrl={imgUrl}>
      <AlbumLink to={`/album/${albumData.name.replace(/\s+/g, '-')}`}>
        <div className="txtWrapper">
          <p className="albumTitle">{albumData.name}</p>
          <div className="CountWrapper">
            <p className="albumCount">{albumData.feedList.length}</p>
            {showDeleteButton && <button type="button" onClick={HandleModal} />}
          </div>
        </div>
      </AlbumLink>
      {isModalOpen && (
        <DeleteAlbumModal
          albumId={albumData.id}
          albumName={albumData.name}
          onClose={HandleCloseModal}
        />
      )}
    </AlbumContainer>
  );
};
export default Album;
