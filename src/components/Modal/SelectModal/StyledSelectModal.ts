import styled from 'styled-components';

const SelectModal = styled.div`
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
  }

  .modal-content {
    background: var(--background-color);
    border-radius: 10px;
    width: 30rem;
    font-size: var(--text-l);
    overflow: hidden;
    position: relative;
  }

  .close-button {
    position: absolute;
    top: 1.8rem;
    right: 1.6rem;
  }

  .modal-list button {
    text-align: start;
    width: 100%;
    border-bottom: 1px solid var(--gray-200);
    padding: 1.3rem 1.6rem;
    font-size: var(--text-m);
    transition: all 0.2s ease-in-out;
  }

  .modal-list button:hover {
    background: var(--point-color);
  }
`;

const Header = styled.header`
  padding: 1.4rem 1.6rem;
  border-bottom: 1px solid var(--gray-200);
  text-align: center;
`;

export { SelectModal, Header };
