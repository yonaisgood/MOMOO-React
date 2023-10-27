import styled from 'styled-components';

const StyledMain = styled.main`
  padding: var(--nav-height-mobile) var(--margin-mobile);

  @media (min-width: 431px) {
    padding: var(--nav-height-tablet) var(--margin-tablet) 0;
    margin: 0;
  }

  @media (min-width: 1025px) {
    width: 100%;
    padding: 0 var(--margin-pc);
    margin: var(--padding-top-pc) var(--right-padding-pc) 0 var(--nav-width-pc);
  }
`;

export default StyledMain;
