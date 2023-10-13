import styled from 'styled-components';

const StyledAuth = styled.main`
  padding-left: 256px; // 네비
  padding-right: calc((100% - 256px - 48px) / 12 * 2); // 임시
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;

  article {
    padding-right: 56px;
    font-family: var(--serif);
    font-size: var(--title-xl);

    h2 + a,
    a + h2 {
      margin-top: 10px;
    }

    h2 {
      display: inline-block;
      color: var(--gray-900);
    }

    a {
      display: block;
      color: var(--gray-300);
    }

    h2::after {
      content: '';
      display: block;
      margin-top: -15px;
      width: 100%;
      height: 1px;
      background: var(--gray-900);
    }
  }

  form {
    border-left: 1.5px solid var(--gray-300);
    box-sizing: content-box;
    padding-left: 96px;
    width: 100%;
    max-width: 480px;

    input + label + input {
      margin-top: 20px;
    }

    input {
      padding: 20px 30px;
      font-size: var(--text-m);
    }

    button {
      margin-top: 40px;
    }

    .profile {
      display: block;
      width: 171px;
      margin: auto;

      img:first-child {
        aspect-ratio: 1/1;
        object-fit: contain;
      }

      img:last-child {
        margin-top: -45px;
        margin-left: auto;
        width: 45px;
        aspect-ratio: 1/1;
        object-fit: contain;
      }
    }
  }
`;

export default StyledAuth;
