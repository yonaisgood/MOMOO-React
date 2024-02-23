import styled from 'styled-components';

const SelectModal = styled.dialog`
  border-radius: 10px;
  overflow: hidden;

  .modal-content {
    background: var(--background-color);
    width: 30rem;
    font-size: var(--text-l);
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
  .modal-list button:last-child {
    margin-bottom: 0.6rem;
    border: none;
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
