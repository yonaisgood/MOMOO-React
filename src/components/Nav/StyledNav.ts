import styled from 'styled-components';

const StyledNav = styled.nav`
  position: fixed;
  z-index: 1;
  background-color: var(--background-color);

  .navBtn button {
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  .navBtn button img {
    width: 2.4rem;
    height: 2.4rem;
  }

  .navBtn button p {
    font-size: var(--text-m);
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

  .logoImg {
    width: 37.6rem;
    height: 6.4rem;
    rotate: 90deg;
    position: absolute;
    bottom: 10.9rem;
    right: -2rem;
  }

  @media (min-width: 1025px) {
    flex-shrink: 0;
    width: var(--nav-width-pc);
    height: 100vh;

    .navBtn button {
      padding: 1.8rem 4.8rem;
      width: 100%;
    }

    .navBtn button:first-child {
      margin-top: 10.2rem;
    }
  }

  @media (max-width: 1024px) {
    position: fixed;
    width: var(--nav-height-tablet);
    padding: 7.2rem 2.4rem 0 3.2rem;
    height: 100vh;

    .navBtn {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2.8rem;
      width: 100%;
    }

    .navBtn button p {
      display: none;
    }

    .logoImg {
      width: 20rem;
      height: 10rem;
      bottom: 4.9rem;
      right: -6.5rem;
    }
  }

  @media (max-width: 744px) {
    position: fixed;
    display: flex;
    width: 100%;
    height: var(--nav-height-tablet);
    padding: 2.4rem;

    .navBtn {
      display: flex;
      flex-direction: row;
      justify-content: end;
    }

    .logoImg {
      rotate: 0deg;
      width: 19.6rem;
      height: 10rem;
      top: -12px;
      left: 24px;
    }
  }
`;

export default StyledNav;
