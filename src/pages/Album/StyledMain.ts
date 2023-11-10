import styled from 'styled-components';

const StyledMain = styled.main`
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

export default StyledMain;
