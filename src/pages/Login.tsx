import { Link, useNavigate } from 'react-router-dom';
import StyledInput from '../components/StyledInput';
import StyledAuth from '../components/StyledAuth';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import Button from '../components/Button/Button';
import Logo from '../asset/icon/Logo.svg';
import { useLogin } from '../hooks/useLogin';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [emailErrMessage, setEmailErrMessage] = useState('');
  const [passwordErrMessage, setPasswordErrMessage] = useState('');
  const [loginErrMessage, setLoginErrMessage] = useState('');
  const [clientWitch, setClientWitch] = useState(
    document.documentElement.clientWidth
  );
  const { login, error } = useLogin();
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener('resize', () => {
      setClientWitch(document.documentElement.clientWidth);
    });
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    login(email, password);

    if (error === null) {
      // navigate('/home');
      return;
    }

    switch (error) {
      case 'auth/invalid-login-credentials':
        setLoginErrMessage('아이디 혹은 비밀번호가 일치하지 않습니다');
        break;
      case 'auth/network-request-failed':
        alert('네트워크 연결에 실패했습니다');
        break;
      case 'auth/internal-error':
        alert('잘못된 요청입니다');
        break;
      case 'auth/too-many-requests':
        setLoginErrMessage(
          '여러 번 로그인에 실패하여 해당 계정에 대한 로그인이 비활성화되었습니다. 나중에 다시 시도해 주세요'
        );
        break;
      default:
        alert('로그인에 실패했습니다');
    }
  };

  const handleEmailInp = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setLoginErrMessage('');

    if (e.target.validity.valueMissing) {
      setEmailValid(false);
      setEmailErrMessage('이메일을 입력해주세요');
    } else if (e.target.validity.typeMismatch) {
      setEmailValid(false);
      setEmailErrMessage('이메일 형식이 올바르지 않습니다');
    } else {
      setEmailValid(true);
      setEmailErrMessage('');
    }
  };

  const handlePasswordInp = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);

    if (e.target.validity.valueMissing) {
      setPasswordValid(false);
      setPasswordErrMessage('비밀번호를 입력해주세요');
    } else {
      setPasswordValid(true);
      setPasswordErrMessage('');
    }
  };

  return (
    <StyledAuth>
      <div className='container'>
        {clientWitch < 431 && (
          <>
            <h1>
              <img src={Logo} alt='로고' />
            </h1>
            <p>
              안녕하세요.
              <br />
              MOMOO 입니다.
            </p>
          </>
        )}
        <article>
          <h2>Login</h2>
          <Link to='/signup'>Signup</Link>
        </article>
        <form onSubmit={handleSubmit}>
          <label htmlFor='email-inp' className='a11y-hidden'>
            이메일
          </label>
          <StyledInput
            id='email-inp'
            placeholder='email'
            type='email'
            onChange={handleEmailInp}
            required
          />
          <strong role='alert'>
            {emailErrMessage && `*${emailErrMessage}`}
          </strong>
          <label htmlFor='password-inp' className='a11y-hidden'>
            비밀번호
          </label>
          <StyledInput
            id='password-inp'
            placeholder='password'
            type='password'
            onChange={handlePasswordInp}
            required
          />
          <strong role='alert'>
            {passwordErrMessage
              ? `*${passwordErrMessage}`
              : loginErrMessage
              ? `*${loginErrMessage}`
              : ''}
          </strong>
          <Button
            size={clientWitch > 1024 ? 'l' : 's'}
            disabled={!emailValid || !passwordValid}
          >
            Log In
          </Button>
        </form>
      </div>
    </StyledAuth>
  );
}
