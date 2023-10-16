import styled from 'styled-components';
import StyledAuth from '../../components/StyledAuth';

const StyledMain = styled(StyledAuth)`
  article {
    justify-content: flex-start;

    h2 {
      margin-bottom: 80px;
    }

    button + button {
      margin-top: 32px;
    }

    button {
      padding: 10px;
      font-size: var(--title-s);
    }

    button:hover {
      background: var(--point-color);
    }

    button.selected {
      background: var(--gray-800);
      color: var(--gray-100);
    }
  }

  .delete-btn {
    display: flex;
    margin-top: 46px;
    padding: 10px 20px;
    width: 100%;
    font-size: var(--text-l);
    font-family: var(--serif);
    border: 1px solid var(--gray-800);
    color: var(--error-color);

    img {
      margin-left: auto;
      width: 20px;
      aspect-ratio: 1/1;
    }
  }

  @media (max-width: 430px) {
    padding: 96px 16px 0;

    .profile {
      margin: 0 auto 55px;
    }

    form {
      button {
        margin-top: 35px;
        position: static;
        width: 100%;
      }
    }
  }
`;

export default StyledMain;
