import styled from 'styled-components';

const StyledMain = styled.main`
  padding: var(--nav-height-mobile) var(--margin-mobile);

  .btn-wrap {
    display: flex;
    margin-bottom: 16px;

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

  @media (max-width: 430px) {
    .btn-wrap {
      margin: 0 0 12px;

      button {
        width: 16px;
        margin-left: 12px;
      }
    }
  }

  @media (min-width: 431px) {
    padding: var(--nav-height-tablet) var(--margin-tablet) 0;
    margin: 0;

    .btn-wrap {
      margin-top: 40px;
    }
  }

  @media (min-width: 1025px) {
    width: 100%;
    padding: 0 var(--margin-pc) 56px;
    margin: var(--padding-top-pc) var(--right-padding-pc) 0 var(--nav-width-pc);

    .btn-wrap {
      margin-top: 36px;
    }
  }

  section {
    margin: auto;
    max-width: 976px;
    width: fit-content;
  }

  @media (max-width: 430px) {
    section {
      padding: 36px 0 0;
    }
  }
`;

export default StyledMain;
