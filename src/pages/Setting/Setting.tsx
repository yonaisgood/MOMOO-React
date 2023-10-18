import { FormEvent, useEffect, useState } from 'react';
import StyledInput from '../../components/StyledInput';
import StyledMain from './StyledMain';
import Button from '../../components/Button/Button';
import ProfileBasicImg from '../../asset/image/profile-basic-img.svg';
import EditCircle from '../../asset/icon/EditCircle.svg';
import DeleteIcon from '../../asset/icon/DeleteRed.svg';
import useAuthContext from '../../hooks/useAuthContext';
import { useUpdateProfile } from '../../hooks/useUpdateProfile';
import useFileInp from '../../hooks/useHandleFileInp';
import useReauthenticate from '../../hooks/useReauthenticate';

export default function Setting() {
  const { user } = useAuthContext();
  const [file, setFile] = useState<File | null>(null);
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [src, setSrc] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [emailErrMessage, setEmailErrMessage] = useState('');
  const [passwordErrMessage, setPasswordErrMessage] = useState('');
  const [passwordConfirmErrMessage, setPasswordConfirmErrMessage] =
    useState('');
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [matchPassword, setMatchPassword] = useState(true);
  const [changed, setChanged] = useState(false);
  const [selectedBtn, setSelectedBtn] = useState('프로필 설정');
  const [clientWitch, setClientWitch] = useState(
    document.documentElement.clientWidth
  );
  const { setProfile, error: updateProfileError } = useUpdateProfile();
  const { reauthenticate, error: reauthenticateError } = useReauthenticate();

  useEffect(() => {
    window.addEventListener('resize', () => {
      setClientWitch(document.documentElement.clientWidth);
    });
  }, []);

  useEffect(() => {
    const userDisplayName = user?.displayName || '';
    const userPhotoURL = user?.photoURL || '';

    if (
      user?.email !== email ||
      userPhotoURL !== src ||
      userDisplayName !== displayName
    ) {
      setChanged(true);
    } else if (!!password) {
      setChanged(true);
    } else {
      setChanged(false);
    }
  }, [email, src, displayName, password]);

  useEffect(() => {
    if (user === null) {
      return;
    }
    if (user.email) {
      setEmail(user.email);
    }

    if (user.displayName) {
      setDisplayName(user.displayName);
    }

    if (user.photoURL) {
      setSrc(user.photoURL);
    }

    // 초기화
    setEmailValid(true);
    setPasswordValid(true);
    setMatchPassword(true);
    setChanged(false);
    setPassword('');
    setPasswordConfirm('');
  }, [user]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setChanged(false);

    // 현재 비밀번호 입력받은 후, 재인증
    if (email !== user?.email || password) {
      const userPassword = prompt('현재 비밀번호를 입력해주세요');
      if (userPassword === null) {
        alert('비밀번호가 누락되었습니다');
        return;
      }
      await reauthenticate(userPassword);
    }

    type Profile = {
      file: File | null;
      displayName: string | null;
      email: string | null;
      password: string | null;
    };

    const profile: Profile = { file, displayName: null, email: null, password };

    if (displayName !== user?.displayName) {
      profile.displayName = displayName;
    }

    if (email !== user?.email) {
      profile.email = email;
    }

    await setProfile(profile);
  };

  useEffect(() => {
    if (!reauthenticateError) {
      return;
    }

    switch (reauthenticateError) {
      case 'auth/wrong-password':
        alert('비밀번호가 일치하지 않습니다');
        break;
      case 'auth/network-request-failed':
        alert('네트워크 연결에 실패했습니다');
        break;
      case 'auth/internal-error':
        alert('잘못된 요청입니다');
        break;
      default:
        alert('계정 인증에 실패했습니다');
    }

    setChanged(true);
  }, [reauthenticateError]);

  useEffect(() => {
    console.log(updateProfileError);
    if (!updateProfileError) {
      return;
    }

    switch (updateProfileError) {
      case 'auth/email-already-in-use':
        setEmailErrMessage('이미 사용 중인 이메일입니다');
        setEmailValid(false);
        break;
      case 'auth/network-request-failed':
        alert('네트워크 연결에 실패했습니다.');
        break;
      case 'auth/invalid-email':
        setEmailErrMessage('잘못된 이메일 형식입니다');
        setEmailValid(false);
        break;
      case 'auth/internal-error':
        alert('잘못된 요청입니다');
        break;
      default:
        alert('프로필 변경에 실패했습니다');
    }

    setChanged(true);
  }, [updateProfileError]);

  const handlePasswordInp = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);

    if (e.target.validity.tooShort) {
      setPasswordValid(false);
      setPasswordErrMessage('6자 이상 입력해주세요');
    } else {
      setPasswordValid(true);
      setPasswordErrMessage('');
    }

    if (e.target.value !== passwordConfirm) {
      setMatchPassword(false);
    } else {
      setMatchPassword(true);
      setPasswordConfirmErrMessage('');
    }
  };

  const handlePasswordConfirmInp = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirm(e.target.value);

    if (e.target.value !== password) {
      setMatchPassword(false);
      setPasswordConfirmErrMessage('비밀번호가 일치하지 않습니다');
    } else {
      setMatchPassword(true);
      setPasswordConfirmErrMessage('');
    }
  };

  const handleEmailInp = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);

    if (e.target.validity.valueMissing) {
      setEmailErrMessage('필수 항목입니다');
      setEmailValid(false);
    } else {
      setEmailErrMessage('');
      setEmailValid(true);
    }
  };

  return (
    <StyledMain>
      <div>
        {clientWitch > 431 && (
          <article>
            <h2>Setting</h2>
            <button
              type='button'
              className={selectedBtn === '프로필 설정' ? 'selected' : ''}
            >
              프로필 설정
            </button>
            <button
              type='button'
              className={selectedBtn === '회원탈퇴' ? 'selected' : ''}
            >
              회원탈퇴
            </button>
          </article>
        )}
        <form onSubmit={handleSubmit}>
          <label htmlFor='profile-inp' className='profile'>
            <img src={src || ProfileBasicImg} alt='프로필 사진' />
            <img src={EditCircle} alt='변경하기' />
          </label>
          <input
            id='profile-inp'
            type='file'
            className='a11y-hidden'
            onChange={(e) => useFileInp(e, setFile, setSrc)}
          />

          <label htmlFor='username-inp' className='a11y-hidden'>
            사용자 이름
          </label>
          <StyledInput
            id='username-inp'
            placeholder='username'
            type='text'
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
          <label htmlFor='email-inp' className='a11y-hidden'>
            이메일
          </label>
          <StyledInput
            id='email-inp'
            placeholder='email'
            type='email'
            value={email}
            maxLength={98}
            onChange={handleEmailInp}
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
            minLength={6}
            maxLength={20}
            value={password}
            onChange={handlePasswordInp}
          />
          <strong role='alert'>
            {passwordErrMessage && `*${passwordErrMessage}`}
          </strong>
          <label htmlFor='password-inp' className='a11y-hidden'>
            비밀번호 재확인
          </label>
          <StyledInput
            id='password-inp'
            placeholder='password confirm'
            type='password'
            minLength={6}
            maxLength={20}
            value={passwordConfirm}
            onChange={handlePasswordConfirmInp}
          />
          <strong role='alert'>
            {passwordConfirmErrMessage && `*${passwordConfirmErrMessage}`}
          </strong>
          <Button
            size={clientWitch > 1024 ? 'l' : 's'}
            disabled={
              !emailValid || !passwordValid || !matchPassword || !changed
            }
          >
            Save
          </Button>
        </form>
        {clientWitch <= 430 && (
          <button type='button' className='delete-btn'>
            Delete account
            <img src={DeleteIcon} alt='' />
          </button>
        )}
      </div>
    </StyledMain>
  );
}
