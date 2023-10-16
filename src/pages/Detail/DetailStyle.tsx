import styled from 'styled-components';

const DetailWrapper = styled.div`
  display: flex;
  color: var();
`;

const NavTemp = styled.div`
  position: sticky;
  width: 25.6rem;
  height: 100vh;
  top: 0;
  background-color: var(--gray-300);
  font-size: 10rem;
`;

const DetailLayout = styled.section`
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  padding: 11.6rem 0 0;
`;

const DepthInfo = styled.div`
  background-color: var(--grey-200);
  width: 19rem;
  font-size: var(--text-m);

  p {
    width: 100%;
    writing-mode: vertical-rl;
    text-orientation: sideways;
    padding-right: 4.8rem;
    color: var(--gray-600);
  }

  span {
    color: var(--gray-900);
  }
`;

const DetailContents = styled.div`
  max-width: 45rem;
  margin: 0 auto 3rem;

  .picSection {
    max-width: 100%;
    aspect-ratio: 1/1;
    background-color: var(--gray-900);
  }

  .iconSection {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 2rem 0 1.2rem;

    img {
      display: inline-block;
      width: 3.2rem;
      aspect-ratio: 1/1;
    }

    img:first-child {
      margin-right: 0.2rem;
    }

    .seeMore {
      width: 2rem;
    }
  }

  .textSection {
    margin-bottom: 4rem;
    margin-top: 2rem;

    h2 {
      margin-bottom: 2rem;
      font-size: var(--text-l);
    }

    p {
      font-size: var(--text-m);
    }

    .detailText {
      overflow: hidden;
      white-space: normal;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 5;
      -webkit-box-orient: vertical;
      word-break: keep-all;
    }
  }

  .infoSection {
    font-size: var(--text-s);
    display: flex;
    gap: 4.8rem;
  }
`;

export { DetailWrapper, NavTemp, DetailLayout, DetailContents, DepthInfo };
