import styled from 'styled-components';

const StyledGridFeed = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin: -8px -8px;
  grid-auto-rows: 1px;
  margin-top: 56px;

  li {
    margin: 8px;
    height: fit-content;
    position: relative;

    img {
      height: auto;
    }
  }

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

    img {
      width: 20px;
      aspect-ratio: 1/1;
    }
  }

  @media (max-width: 430px) {
    margin: -6px -6px 0;

    li {
      margin: 6px;
    }

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

  .upload {
    width: 100%;
    aspect-ratio: 3/4;
    background: var(--gray-100);

    img {
      width: 24px;
      aspect-ratio: 1/1;
      margin: auto;
    }
  }

  @media (max-width: 1024px) {
    margin-top: 12px;
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 430px) {
    margin-top: 0;
  }
`;

export default StyledGridFeed;
