import { Link } from 'react-router-dom';
import More from '../../asset/icon/more-white.svg';
import { DocumentData } from 'firebase/firestore';
import useGetFeedData from '../../hooks/useGetFeedData';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import DeleteAlbumModal from '../Modal/DeleteAlbumModal';

interface Props {
  imageUrl?: string[];
}
const AlbumContainer = styled.article<Props>`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  background: ${(props) =>
    props.imageUrl && props.imageUrl.length > 0
      ? `linear-gradient(0deg, #343434 5.58%, rgba(126, 126, 126, 0) 40.58%, rgba(225, 225, 225, 0) 105.15%), url(${props.imageUrl[0]}) no-repeat center / cover`
      : 'linear-gradient(0deg, #343434 5.58%, rgba(126, 126, 126, 0) 40.58%, rgba(225, 225, 225, 0) 105.15%), var(--gray-200)'};
  .txtWrapper {
    width: 100%;
    position: absolute;
    bottom: 0;
    padding: 2rem 1.5rem;
    .albumTitle {
      color: var(--background-color);
      font-size: 2.4rem;
    }
    .CountWrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .albumCount {
        color: var(--gray-200);
        font-family: Prata;
        font-size: 2rem;
        font-style: normal;
        font-weight: 400;
        line-height: 150%;
      }
      button {
        width: 2rem;
        height: 2rem;
        background: url(${More}) no-repeat center/ contain;
      }
    }
  }
`;

const AlbumLink = styled(Link)`
  display: block;
  width: inherit;
  height: inherit;
`;
interface AlbumProps {
  albumData: DocumentData;
}

const Album: React.FC<AlbumProps> = ({ albumData }) => {
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
    <AlbumContainer imageUrl={imgUrl}>
      <AlbumLink to={`/album/${albumData.name.replace(/\s+/g, '-')}`}>
        <div className="txtWrapper">
          <p className="albumTitle">{albumData.name}</p>
          <div className="CountWrapper">
            <p className="albumCount">{albumData.feedList.length}</p>
            <button type="button" onClick={HandleModal} />
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
