import { Link } from 'react-router-dom';
import { useState } from 'react';
import StyledInput from '../components/StyledInput';
import StyledAuth from '../components/StyledAuth';
import Button from '../components/Button';
import ProfileBasicImg from '../asset/image/profile-basic-img.svg';
import EditCircle from '../asset/icon/EditCircle.svg';
import Logo from '../asset/icon/Logo.svg';
import useSignup from '../hooks/useSingup.ts';

export default function Signup() {
  const [file, setFile] = useState<File | null>(null);
  const [src, setSrc] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [clientWitch, setClientWitch] = useState(
    document.documentElement.clientWidth
  );
  const { error, signup } = useSignup();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signup(email, password, displayName, file);
    console.log(error);
  };

  const handleInp = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.id) {
      case 'email-inp':
        setEmail(e.target.value);
        break;
      case 'password-inp':
        setPassword(e.target.value);
        break;
      case 'username-inp':
        setDisplayName(e.target.value);
    }
  };

  const handleFileInp = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    const file = e.target.files[0];

    if (!/^image\/(jpg|png|jpeg|bmp|tif|heic)$/.test(file.type)) {
      alert(
        '이미지 파일 확장자는 jpg, png, jpeg, bmp, tif, heic만 가능합니다.'
      );
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert('이미지 용량은 2MB 이내로 등록 가능합니다.');
      return;
    }

    const reader = new FileReader();

    reader.readAsDataURL(file);
    setFile(file);

    reader.addEventListener('load', ({ target }) => {
      if (typeof target?.result !== 'string') {
        return;
      }

      const image = new Image();
      image.src = target.result;
      setSrc(target.result);
    });
  };

  return (
    <StyledAuth>
      <div>
        {clientWitch < 431 && (
          <>
            <h1>
              <img src={Logo} alt="로고" />
            </h1>
            <p>
              안녕하세요.
              <br />
              MOMOO 입니다.
            </p>
          </>
        )}
        <article>
          <Link to="/login">Login</Link>
          <h2>Signup</h2>
        </article>
        <form onSubmit={handleSubmit}>
          <label htmlFor='profile-inp' className='profile'>
            <img src={src || ProfileBasicImg} alt='프로필 사진' />
            <img src={EditCircle} alt='변경하기' />
          </label>
          <input
            id='profile-inp'
            type='file'
            className='a11y-hidden'
            onChange={handleFileInp}
          />
          <label htmlFor="username-inp" className="a11y-hidden">
            사용자 이름
          </label>
          <StyledInput
            id='username-inp'
            placeholder='username'
            type='text'
            onChange={handleInp}
          />
          <label htmlFor='email-inp' className='a11y-hidden'>
            이메일
          </label>
          <StyledInput
            id='email-inp'
            placeholder='email'
            type='email'
            onChange={handleInp}
          />
          <label htmlFor='password-inp' className='a11y-hidden'>
            비밀번호
          </label>
          <StyledInput
            id='password-inp'
            placeholder='password'
            type='password'
            onChange={handleInp}
          />
          <label htmlFor='password-inp' className='a11y-hidden'>
            비밀번호 재확인
          </label>
          <StyledInput id="password-inp" placeholder="password confirm" type="password" />
          <Button size={clientWitch > 1024 ? "l" : "s"} disabled={disabled}>
            Signup
          </Button>
        </form>
      </div>
    </StyledAuth>
  );
}
