import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import StyledInput from '../components/StyledInput';
import StyledAuth from '../components/StyledAuth';
import Button from '../components/Button/Button.tsx';
import ProfileBasicImg from '../asset/image/profile-basic-img.svg';
import EditCircle from '../asset/icon/EditCircle.svg';
import Logo from '../asset/icon/Logo.svg';
import useSignup from '../hooks/useSingup.ts';
import useFileInp from '../hooks/useHandleFileInp.ts';

export default function Signup() {
  const [file, setFile] = useState<File | null>(null);
  const [src, setSrc] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [displayName, setDisplayName] = useState<null | string>(null);
  const [emailErrMessage, setEmailErrMessage] = useState('');
  const [passwordErrMessage, setPasswordErrMessage] = useState('');
  const [passwordConfirmErrMessage, setPasswordConfirmErrMessage] =
    useState('');
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [matchPassword, setMatchPassword] = useState(false);
  const [clientWitch, setClientWitch] = useState(
    document.documentElement.clientWidth,
  );
  const { error, signup } = useSignup();

  useEffect(() => {
    window.addEventListener('resize', () => {
      setClientWitch(document.documentElement.clientWidth);
    });
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signup(email, password, displayName, file);
  };

  useEffect(() => {
    if (error === null) {
      return;
    }

    switch (error) {
      case 'auth/email-already-in-use':
        setEmailErrMessage('이미 사용 중인 이메일입니다');
        break;
      case 'auth/network-request-failed':
        alert('네트워크 연결에 실패했습니다');
        break;
      case 'auth/invalid-email':
        setEmailErrMessage('잘못된 이메일 형식입니다');
        break;
      case 'auth/internal-error':
        alert('잘못된 요청입니다');
        break;
      case 'auth/weak-password':
        setPasswordErrMessage('6자 이상 입력해주세요');
        break;
      default:
        alert('회원가입에 실패했습니다');
    }
  }, [error]);

  const handleEmailInp = (target: HTMLInputElement) => {
    setEmail(target.value);

    if (target.validity.valueMissing) {
      setEmailErrMessage('이메일을 입력해주세요');
      setEmailValid(false);
    } else {
      setEmailErrMessage('');
      setEmailValid(true);
    }
  };

  const handlePasswordInp = (target: HTMLInputElement) => {
    setPassword(target.value);

    if (target.validity.valueMissing) {
      setPasswordErrMessage('비밀번호를 입력해주세요');
      setPasswordValid(false);
    } else if (target.validity.tooShort) {
      setPasswordValid(false);
      setPasswordErrMessage('6자 이상 입력해주세요');
    } else {
      setPasswordValid(true);
      setPasswordErrMessage('');
    }

    if (target.value !== passwordConfirm) {
      setMatchPassword(false);
    } else {
      setMatchPassword(true);
      setPasswordConfirmErrMessage('');
    }
  };

  const handlePasswordConfirmInp = (value: string) => {
    setPasswordConfirm(value);

    if (value !== password) {
      setMatchPassword(false);
      setPasswordConfirmErrMessage('비밀번호가 일치하지 않습니다');
    } else {
      setMatchPassword(true);
      setPasswordConfirmErrMessage('');
    }
  };

  const handleInp = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.id) {
      case 'email-inp':
        handleEmailInp(e.target);
        break;
      case 'password-inp':
        handlePasswordInp(e.target);
        break;
      case 'passwordConfirm-inp':
        handlePasswordConfirmInp(e.target.value);
        break;
      case 'displayName-inp':
        setDisplayName(e.target.value);
    }
  };

  return (
    <StyledAuth>
      <div className="container">
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
          <label htmlFor="profile-inp" className="profile">
            <img src={src || ProfileBasicImg} alt="프로필 사진" />
            <img src={EditCircle} alt="변경하기" />
          </label>
          <input
            id="profile-inp"
            type="file"
            className="a11y-hidden"
            onChange={(e) => useFileInp(e, setFile, setSrc)}
          />
          <label htmlFor="displayName-inp" className="a11y-hidden">
            사용자 이름
          </label>
          <StyledInput
            id="displayName-inp"
            placeholder="username"
            type="text"
            onChange={handleInp}
          />
          <label htmlFor="email-inp" className="a11y-hidden">
            이메일
          </label>
          <StyledInput
            id="email-inp"
            placeholder="email"
            type="email"
            maxLength={98}
            onChange={handleInp}
            required
          />
          <strong role="alert">
            {emailErrMessage && `*${emailErrMessage}`}
          </strong>
          <label htmlFor="password-inp" className="a11y-hidden">
            비밀번호
          </label>
          <StyledInput
            id="password-inp"
            placeholder="password"
            type="password"
            minLength={6}
            maxLength={20}
            onChange={handleInp}
            required
          />
          <strong role="alert">
            {passwordErrMessage && `*${passwordErrMessage}`}
          </strong>
          <label htmlFor="passwordConfirm-inp" className="a11y-hidden">
            비밀번호 재확인
          </label>
          <StyledInput
            id="passwordConfirm-inp"
            placeholder="password confirm"
            type="password"
            minLength={6}
            maxLength={20}
            onChange={handleInp}
            required
          />
          <strong role="alert">
            {passwordConfirmErrMessage && `*${passwordConfirmErrMessage}`}
          </strong>
          <Button
            size={clientWitch > 1024 ? 'l' : 's'}
            disabled={!emailValid || !passwordValid || !matchPassword}
          >
            Signup
          </Button>
        </form>
      </div>
    </StyledAuth>
  );
}
