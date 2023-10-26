import styled from 'styled-components';

const StyledNav = styled.nav`
  background-color: red;

  .navBtn button {
    border: 1px solid black;
    width: 100%;
    padding: 1rem;
  }

  /* .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1;
  } */

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
