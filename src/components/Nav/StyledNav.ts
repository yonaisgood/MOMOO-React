import styled from 'styled-components';

const StyledNav = styled.nav`
  @media (min-width: 1025px) {
    flex-shrink: 0;
    position: relative;
    width: var(--nav-width-pc);
    height: 100vh;
  }

  @media (max-width: 1024px) {
    position: fixed;
    padding: 24px;
  }
`;

export default StyledNav;
