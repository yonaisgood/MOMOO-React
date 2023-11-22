import styled from 'styled-components';

const SelectModal = styled.div`
  .modal-overlay {
    position: fixed;
    z-index: 1;
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
    border-radius: 1rem;
    width: 23rem;
    height: 20rem;
    font-size: var(--text-l);
    overflow: hidden;
    position: relative;
  }

  .modal-list button {
    width: 50%;
    padding: 1rem 1.6rem;
    font-size: var(--text-m);
    transition: all 0.2s ease-in-out;
  }
  .modal-list button:first-child {
    border-right: 1px solid var(--gray-200);
  }

  .modal-list button:hover {
    color: var(--point-color);
  }
`;

const Header = styled.header`
  padding: 2rem 1.6rem;
  border-bottom: 1px solid var(--gray-200);
  text-align: center;

  h2 {
    font-size: 1.6rem;
  }
  p {
    font-size: 1.2rem;
    margin-bottom: 3.3rem;
    color: var(--gray-600);
  }
  input {
    display: block;
    width: 19.8rem;
    height: 3.9rem;
    padding: 2rem 1rem;
    border: 1px solid var(--gray-200, #d2d2d2);

    &::placeholder {
      font-size: 1.2rem;
      color: var(--gray-600);
      margin-left: 1rem;
    }
  }
`;

export { SelectModal, Header };
