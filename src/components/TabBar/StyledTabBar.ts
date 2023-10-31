import styled from 'styled-components';

const StyledNav = styled.nav`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: var(--nav-height-mobile);
  display: flex;
  align-items: center;
  flex-grow: 1;
  z-index: 1;
  background-color: var(--background-color);
  border-top: 1px solid var(--gray-200);
  .navBtn {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1.2rem;
    padding: 0.8rem 1.6rem;
  }
  .navBtn button,
  .navBtn button .homeLink {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
  }

  .navBtn button img {
    width: 2.4rem;
    height: 2.4rem;
  }

  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1;
  }
`;

export default StyledNav;
