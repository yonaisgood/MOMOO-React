import styled from 'styled-components';

const StyledAlbum = styled.main`
  width: 100%;
  padding: 0 var(--margin-pc) 56px;
  margin: var(--padding-top-pc) var(--right-padding-pc) 0 var(--nav-width-pc);

  section {
    margin: auto;
    width: min(976px, 100%);
  }

  @media (max-width: 1024px) {
    padding: var(--nav-height-tablet) var(--margin-tablet) 0;
    margin: 0;
  }

  @media (max-width: 430px) {
    padding: var(--nav-height-mobile) var(--margin-mobile);

    section {
      padding: 40px 0 0;
    }
  }
`;

const StyledFeedList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin: -8px -8px;
  grid-auto-rows: 1px;
  margin-top: 56px;

  @media (max-width: 430px) {
    margin: -6px -6px 0;
  }

  @media (max-width: 1024px) {
    margin-top: 12px;
  }

  @media (max-width: 800px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 430px) {
    margin-top: 0;
  }
`;

const StyledFeedItem = styled.li`
  margin: 8px;
  position: relative;

  .hover-wrap {
    position: absolute;
    inset: 0;
    background: #00000080;
    color: white;

    strong {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: var(--text-l);
    }

    button {
      position: absolute;
      right: 16px;
      bottom: 16px;
      padding: 6px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.8);
    }
  }

  @media (max-width: 430px) {
    margin: 6px;

    .hover-wrap {
      strong {
        font-size: var(--text-m);
      }

      button {
        right: 12px;
        bottom: 12px;
        padding: 4px;
      }

      img {
        width: 16px;
      }
    }
  }
`;

const StyledAddFeedItem = styled.li<{ $ratio: number }>`
  margin: 8px;
  aspect-ratio: ${({ $ratio }) => $ratio};

  @media (max-width: 430px) {
    margin: 6px;
  }

  button {
    width: 100%;
    height: 100%;
    background: var(--gray-100);

    img {
      width: 24px;
      aspect-ratio: 1/1;
      margin: auto;
    }
  }
`;

export default StyledAlbum;
export { StyledFeedList, StyledFeedItem, StyledAddFeedItem };
