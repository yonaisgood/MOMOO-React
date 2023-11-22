import styled from 'styled-components';

const AlertModalWrap = styled.div`
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
  }
  .modalContent {
    background: var(--background-color);
    border-radius: 1rem;
    width: 25.2rem;
    height: 11.2rem;
    font-size: var(--text-l);
    overflow: hidden;
    position: relative;
  }

  .modalList {
    button {
      width: 50%;
      text-align: center;
      padding: 1.2rem;
      font-size: var(--text-m);
      transition: all 0.2s ease-in-out;
    }

    button:first-child {
      border-right: 1px solid var(--gray-200);
    }

    button:hover {
      background-color: var(--point-color);
    }
  }
`;

const Header = styled.header`
  padding: 2.2rem;
  border-bottom: 1px solid var(--gray-200);
  text-align: center;
`;

export { AlertModalWrap, Header };
