import { Link } from 'react-router-dom';
import StyledInput from '../components/StyledInput';
import StyledAuth from '../components/StyledAuth';
import Button from '../components/Button';
import { useState } from 'react';

export default function Login() {
  const [disabled, setDisabled] = useState(true);
  return (
    <StyledAuth>
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
        <StyledInput id='password-inp' placeholder='password' type='password' />
        <Button size='l' disabled={disabled}>
          Log In
        </Button>
      </form>
    </StyledAuth>
  );
}
