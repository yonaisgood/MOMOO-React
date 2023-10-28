import styled from 'styled-components';

const DetailLayout = styled.section`
  /* border: 5px solid green; */
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  padding: 10rem 0 0;
  margin-left: var(--nav-width-pc);
  margin-right: var(--right-padding-pc);
`;

const DetailContents = styled.div`
  /* border: 5px solid yellow; */
  max-width: 50rem;
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

export { DetailLayout, DetailContents };
