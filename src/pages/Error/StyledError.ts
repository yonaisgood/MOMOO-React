import styled from 'styled-components';

const StyledError = styled.main`
  width: 100%;

  @media (min-width: 431px) {
    padding: var(--nav-height-tablet) var(--margin-tablet) 0;
  }

  @media (min-width: 1025px) {
    margin: 0 var(--right-padding-pc) 0 var(--nav-width-pc);
    padding: 0 var(--margin-pc);
  }
`;

export default StyledError;
