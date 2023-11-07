import styled from 'styled-components';

const StyledHomeSection = styled.section`
  max-width: 33.3rem;
  margin: auto;

  .btn-wrap {
    display: flex;
    justify-content: space-between;
    margin: 2.3rem 0 2rem;
  }
  .btn-wrap button {
    width: 4.5rem;
    height: 4.5rem;
    border-radius: 50%;
    background-color: var(--gray-100);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .btn-wrap button img {
    width: 2rem;
    height: 2rem;
  }
  .btn-wrap button:hover {
    background-color: var(--point-color);
  }
  .btn-wrap button:focus {
    background-color: var(--gray-800);
    img {
      filter: invert(99%) sepia(13%) saturate(487%) hue-rotate(187deg)
        brightness(113%) contrast(84%);
    }
  }
  ul {
    display: flex;
    flex-direction: column;
    gap: 5.5rem;
  }
  li {
    width: 100%;
    aspect-ratio: 3/4;
  }

  @media (max-width: 744px) {
    max-width: 100%;
    margin: 0;
    ul {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 4rem 1.6rem;
    }
    li {
      flex-shrink: 0;
    }
    .btn-wrap button {
      width: 3rem;
      height: 3rem;
      background-color: inherit;
    }
  }
  @media (max-width: 430px) {
    ul {
      display: flex;
    }
  }
`;
export default StyledHomeSection;
