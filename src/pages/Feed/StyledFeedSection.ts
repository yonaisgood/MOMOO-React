import styled from 'styled-components';

const StyledFeedSection = styled.section`
  max-width: 976px;
  margin: auto;

  .btn-wrap {
    margin-top: 36px;
    display: flex;

    button {
      margin-left: 14px;
      width: 21px;
      aspect-ratio: 1/1;
      font-size: 0;
    }

    button:first-child {
      margin-left: auto;
    }

    svg {
      width: 100%;
    }
  }

  ul {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    margin: 8px -8px 0;
    /* grid-auto-rows: 1px; */
  }

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
    padding: 36px 0 0;

    .btn-wrap {
      margin-top: 0;

      button {
        width: 16px;
        margin-left: 12px;
      }
    }

    ul {
      margin: 6px -6px 0;
    }

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

  @media (max-width: 834px) {
    ul {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 431px) and(max-width: 1024px) {
    .btn-wrap {
      margin-top: 40px;
    }
  }
`;

export default StyledFeedSection;
