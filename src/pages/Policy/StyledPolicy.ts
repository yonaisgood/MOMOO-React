import styled from 'styled-components';

const StyledPolicy = styled.main`
  max-width: 1024px;
  box-sizing: content-box;
  color: var(--gray-900);
  font-size: var(--text-m);

  section {
    margin-top: 52px;

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

  margin: 0 var(--right-padding-pc) 0 var(--nav-width-pc);
  padding: var(--padding-top-pc) var(--margin-pc) 52px;

  @media (max-width: 1024px) {
    margin: 0 auto;
    padding: calc(var(--nav-height-tablet)) 24px 32px;

    section {
      margin-top: 32px;
    }
  }

  @media (max-width: 430px) {
    margin: 0 auto;
    padding: calc(var(--nav-height-mobile) + 32px) 16px;

    section {
      margin-top: 0;
    }
  }
`;

export default StyledPolicy;
