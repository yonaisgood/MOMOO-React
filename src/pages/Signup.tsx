import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import useSignup from '../hooks/useSingup.ts';
import useSetProfileImage from '../hooks/useSetProfileImage.ts';

import Button from '../components/Button/Button/Button.tsx';
import StyledInput from '../components/CommonStyled/StyledInput.ts';
import StyledAuth from '../components/CommonStyled/StyledAuth.ts';

import ProfileBasicImg from '../asset/image/profile-basic-img.svg';
import EditCircle from '../asset/icon/EditCircle.svg';
import Logo from '../asset/icon/Logo.svg';
import LoadingIcon from '../asset/icon/LoadingBlack.svg';

export default function Signup() {
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
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());
  const [ageVaile, setAgeVaild] = useState(false);
  const today = useMemo(() => {
    const date = new Date();

    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      date: date.getDate(),
    };
  }, []);

  const { error, signup, isPending } = useSignup();
  const { file, src, setProfileImage } = useSetProfileImage();

  useEffect(() => {
    window.addEventListener('resize', () => {
      setClientWitch(document.documentElement.clientWidth);
    });
  }, []);

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signup({ email, password, displayName, file });
  };

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

  const checkAge = () => {
    if (selectedYear + 14 > today.year) {
      console.log('a');
      setAgeVaild(false);
      return;
    }

    if (selectedYear + 14 < today.year) {
      console.log('b');
      setAgeVaild(true);
      return;
    }

    if (selectedMonth > today.month) {
      console.log(today.month);
      setAgeVaild(false);
      return;
    }

    if (selectedMonth < today.month) {
      console.log('d');
      setAgeVaild(true);
      return;
    }

    if (selectedDate > today.date) {
      console.log('e');
      setAgeVaild(false);
      return;
    }

    setAgeVaild(true);
  };

  useEffect(() => {
    checkAge();
  }, [selectedYear, selectedMonth, selectedDate]);

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
            onChange={setProfileImage}
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

          {/* 생년월일 select */}
          <div>
            <strong>생년월일</strong>
            <p>만 14세 이상 가입 가능합니다.</p>
            <span>
              <select
                title="연도"
                onChange={(e) =>
                  setSelectedYear(parseInt(e.currentTarget.value))
                }
              >
                {Array.from({ length: 106 }, (_, i) => today.year - i).map(
                  (v) => {
                    return (
                      <option title={`${v}`} value={v}>
                        {v}
                      </option>
                    );
                  },
                )}
              </select>
            </span>
            <span>
              <select
                title="월"
                onChange={(e) =>
                  setSelectedMonth(parseInt(e.currentTarget.value))
                }
              >
                {Array.from(
                  {
                    length: selectedYear === today.year ? today.month : 12,
                  },
                  (_, i) => i + 1,
                ).map((v) => {
                  return (
                    <option title={`${v}`} value={v}>
                      {v}
                    </option>
                  );
                })}
              </select>
            </span>
            <span>
              <select
                title="일"
                value={selectedDate}
                onChange={(e) =>
                  setSelectedDate(parseInt(e.currentTarget.value))
                }
              >
                {Array.from(
                  {
                    length:
                      selectedYear === today.year &&
                      selectedMonth === today.month
                        ? today.date
                        : new Date(selectedYear, selectedMonth, 0).getDate(),
                  },
                  (_, i) => i + 1,
                ).map((v) => {
                  return (
                    <option title={`${v}`} value={v}>
                      {v}
                    </option>
                  );
                })}
              </select>
            </span>
          </div>

          {/* 이용약관 동의*/}
          {/* 개인정보 동의 */}

          <Button
            size={clientWitch > 1024 ? 'l' : 's'}
            disabled={
              !emailValid ||
              !passwordValid ||
              !matchPassword ||
              isPending ||
              !ageVaile
            }
          >
            {isPending ? (
              <img src={LoadingIcon} alt="계정 생성 중" />
            ) : (
              'Signup'
            )}
          </Button>
        </form>
      </div>
    </StyledAuth>
  );
}
