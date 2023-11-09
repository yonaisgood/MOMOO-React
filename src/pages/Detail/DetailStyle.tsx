import styled from 'styled-components';

const DetailLayout = styled.main`
  margin: 0 var(--right-padding-pc) 0 var(--nav-width-pc);
  padding: 10rem var(--margin-pc) 0;
  width: 100%;

  section {
    max-width: 50rem;
    margin: auto;
  }

  @media (max-width: 1024px) {
    padding: calc(var(--nav-height-tablet) + 64px) var(--margin-tablet) 0;
    margin: 0;

    section {
      max-width: 100%;
      margin-top: 20px;
    }
  }

  @media (max-width: 430px) {
    padding: var(--nav-height-mobile) var(--margin-mobile);

    section {
      margin-top: 0;
    }
  }
`;

export { DetailLayout };
