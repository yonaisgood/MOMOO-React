import styled from 'styled-components';

const StyledPolicy = styled.main`
  max-width: 1024px;
  margin: auto;
  box-sizing: content-box;
  color: var(--gray-900);
  font-size: var(--text-m);

  section {
    margin-top: 8px;

    h2 {
      font-size: var(--title-s);
      margin-bottom: 52px;
    }

    strong:not(:first-child) {
      margin-top: 44px;
      display: block;
      font-size: var(--text-l);
    }

    li,
    p {
      margin-top: 12px;
    }

    ol ol {
      padding: 4px 0 0 20px;

      li {
        margin-top: 6px;
        font-size: var(--text-s);
      }
    }
  }

  padding: 0 16px;

  @media (max-width: 430px) {
    padding: calc(var(--nav-height-mobile) + 24px) 16px;
  }

  @media (min-width: 431px) {
    padding: calc(var(--nav-height-tablet) + 64px) 24px 44px;
  }

  @media (min-width: 1025px) {
    padding: 116px var(--right-padding-pc) 52px 32px;
  }
`;

export default StyledPolicy;
