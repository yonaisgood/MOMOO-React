import { Link } from 'react-router-dom';
import StyledInput from '../components/StyledInput';
import StyledAuth from '../components/StyledAuth';
import Button from '../components/Button';
import { useEffect, useState } from 'react';
import Logo from '../asset/icon/Logo.svg';

export default function Login() {
  const [disabled, setDisabled] = useState(true);
  const [clientWitch, setClientWitch] = useState(
    document.documentElement.clientWidth
  );

  useEffect(() => {
    window.addEventListener('resize', () => {
      setClientWitch(document.documentElement.clientWidth);
    });
  }, []);

  return (
    <StyledAuth>
      <div>
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
        <form>
          <label htmlFor='email-inp' className='a11y-hidden'>
            이메일
          </label>
          <StyledInput id='email-inp' placeholder='email' type='email' />
          <label htmlFor='password-inp' className='a11y-hidden'>
            비밀번호
          </label>
          <StyledInput
            id='password-inp'
            placeholder='password'
            type='password'
          />
          <Button size={clientWitch > 1024 ? 'l' : 's'} disabled={disabled}>
            Log In
          </Button>
        </form>
      </div>
    </StyledAuth>
  );
}
