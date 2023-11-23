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
    background-color: var(--background-color);
    border-radius: 1rem;
    width: 32rem;
    height: 17.2rem;
    font-size: var(--text-s);
  }

  .modal-list button {
    width: 100%;
    padding: 0.9rem 1.6rem;
    text-align: start;
    font-size: var(--text-s);
    transition: all 0.2s ease-in-out;
  }
  .modal-list button p:last-child {
    color: var(--gray-700);
  }
  .modal-list button:hover {
    background-color: var(--point-color);
  }
`;

const Header = styled.header`
  padding: 1.8rem 1.6rem;
`;

export { SelectModal, Header };
