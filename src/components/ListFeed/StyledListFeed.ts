import styled from 'styled-components';

const StyledListFeed = styled.article`
  margin: 0 auto;
  color: var(--gray-900);

  & + & {
    margin-top: 4rem;
  }

  .picSection {
    aspect-ratio: 1/1;
    background-color: var(--gray-900);
  }

  .iconSection {
    width: 100%;
    display: flex;
    align-items: flex-start;
    margin: 2rem 0 1.2rem;

    img {
      display: inline-block;
      width: 3.2rem;
      aspect-ratio: 1/1;
    }

    img + img {
      margin-left: 1.6rem;
    }

    button {
      margin-left: auto;
      width: 2rem;
      aspect-ratio: 1/1;
      font-size: 0;

      img {
        width: 100%;
      }
    }
  }

  h3 {
    margin-bottom: 2rem;
    font-size: var(--text-l);
  }

  p,
  time {
    font-size: var(--text-m);
  }

  .detailText {
    margin-bottom: 4rem;
  }

  .locaSection {
    display: inline-block;
    margin-right: 4.8rem;
  }

  .date {
    color: var(--gray-600);
  }

  @media (max-width: 430px) {
    .picSection {
      margin: 0 -16px;
    }

    .iconSection {
      margin: 1.6rem 0 1.2rem;

      img {
        width: 2.6rem;
      }

      img + img {
        margin-left: 1.2rem;
      }

      button {
        width: 1.6rem;
      }
    }

    h3 {
      margin-bottom: 1.2rem;
    }

    .detailText {
      margin-bottom: 2.4rem;
    }

    .locaSection {
      margin-right: 2rem;
    }
  }
`;

export default StyledListFeed;
