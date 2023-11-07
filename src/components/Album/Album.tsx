import styled from 'styled-components';
import { Link } from 'react-router-dom';
import More from '../../asset/icon/more-white.svg';
import img1 from '../../asset/image/feed-test/1.jpg';

const AlbumContainer = styled.article`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  background:
    linear-gradient(
      0deg,
      #343434 5.58%,
      rgba(126, 126, 126, 0) 40.58%,
      rgba(225, 225, 225, 0) 105.15%
    ),
    url(${img1}) no-repeat center / cover;
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
export default function Album() {
  return (
    <AlbumContainer>
      <AlbumLink to="/login">
        <div className="txtWrapper">
          <p className="albumTitle">전체보기</p>
          <div className="CountWrapper">
            <p className="albumCount">1923</p>
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
}
