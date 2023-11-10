import { Link } from 'react-router-dom';
import More from '../../asset/icon/more-white.svg';
import img1 from '../../asset/image/feed-test/1.jpg';
import { DocumentData } from 'firebase/firestore';
import useGetFeedData from '../../hooks/useGetFeedData';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

interface Props {
  imageUrl?: string[];
}
const AlbumContainer = styled.article<Props>`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  background: ${(props) =>
    props.imageUrl
      ? `linear-gradient(0deg, #343434 5.58%, rgba(126, 126, 126, 0) 40.58%, rgba(225, 225, 225, 0) 105.15%), url(${props.imageUrl[0]}) no-repeat center / cover`
      : 'linear-gradient(0deg, #343434 5.58%, rgba(126, 126, 126, 0) 40.58%, rgba(225, 225, 225, 0) 105.15%), gray'};
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
  const [imgUrl, setImgUrl] = useState([]);
  const getFeedData = useGetFeedData();
  useEffect(() => {
    const lastFeedId = albumData.feedList[albumData.feedList.length - 1];
    console.log(lastFeedId);
    const getData = async () => {
      const data = await getFeedData(lastFeedId);
      setImgUrl(data?.imageUrl);
      console.log(imgUrl);
    };

    getData();
  }, []);

  return (
    <AlbumContainer imageUrl={imgUrl}>
      <AlbumLink to={`/feed/${albumData.name.replace(/\s+/g, '-')}`}>
        <div className="txtWrapper">
          <p className="albumTitle">{albumData.name}</p>
          <div className="CountWrapper">
            <p className="albumCount">{albumData.feedList.length}</p>
            <button
              type="button"
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                event.preventDefault();
                alert('hey');
              }}
            />
          </div>
        </div>
      </AlbumLink>
    </AlbumContainer>
  );
};
export default Album;
