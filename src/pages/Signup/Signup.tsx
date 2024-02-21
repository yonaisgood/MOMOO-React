import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../../modules/index.ts';
import { resetSignupData, setSignupForm } from '../../modules/signupReducer.ts';
import { resetPageData, setPrevPath } from '../../modules/pageReducer.ts';
import useSignup from '../../hooks/useSingup.ts';
import useSetProfileImage from '../../hooks/useSetProfileImage.ts';

import Button from '../../components/Button/Button/Button.tsx';
import AlertModal from '../../components/Modal/AlertModal/AlertModal';
import StyledInput from '../../components/CommonStyled/StyledInput.ts';
import StyledSignup from './StyledSignup.ts';

import ProfileBasicImg from '../../asset/image/profile-basic-img.svg';
import EditCircle from '../../asset/icon/EditCircle.svg';
import Logo from '../../asset/icon/Logo.svg';
import LoadingIcon from '../../asset/icon/LoadingBlack.svg';
import checkboxChecked from '../../asset/icon/CheckboxChecked.svg';
import checkbox from '../../asset/icon/Checkbox.svg';
import arrow from '../../asset/icon/ArrowRight.svg';

export default function Signup() {
  const [profileImgFiles, setProfileImgFiles] = useState<FileList | null>(null);
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [emailErrMessage, setEmailErrMessage] = useState('');
  const [passwordErrMessage, setPasswordErrMessage] = useState('');
  const [passwordConfirmErrMessage, setPasswordConfirmErrMessage] =
    useState('');
  const [submitErrMessage, setSubmitErrMessage] = useState('');

  const [disabledSubmitBtn, setDisabledSubmitBtn] = useState(true);

  const [allChecked, setAllChecked] = useState(false);
  const [ageChecked, setAgeChecked] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const [privacyChecked, setPrivacyChecked] = useState(false);

  const [clientWitch, setClientWitch] = useState(
    document.documentElement.clientWidth,
  );
  const [imgHasFocus, setImgHasFocus] = useState(false);

  const { error, signup, isPending } = useSignup();
  const {
    file,
    src,
    setProfileImage,
    error: imgErrMessage,
    setError: setImgErrMessage,
  } = useSetProfileImage();

  const prevPath = useSelector(
    (state: RootState) => state.pageReducer.prevPath,
  );
  const signupFormdata = useSelector(
    (state: RootState) => state.signupReducer.signupForm,
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    window.addEventListener('resize', () => {
      setClientWitch(document.documentElement.clientWidth);
    });
  }, []);

  useEffect(() => {
    if ((prevPath === 'terms' || prevPath === 'privacy') && signupFormdata) {
      setProfileImage(signupFormdata.profileImgFiles);
      setDisplayName(signupFormdata.displayName);
      setEmail(signupFormdata.email);
      setPassword(signupFormdata.password);
      setPasswordConfirm(signupFormdata.passwordConfirm);
      setEmailErrMessage(signupFormdata.emailErrMessage);
      setPasswordErrMessage(signupFormdata.passwordErrMessage);
      setPasswordConfirmErrMessage(signupFormdata.passwordConfirmErrMessage);
      setDisabledSubmitBtn(signupFormdata.disabledSubmitBtn);
      setAllChecked(signupFormdata.allChecked);
      setAgeChecked(signupFormdata.ageChecked);
      setTermsChecked(signupFormdata.termsChecked);
      setPrivacyChecked(signupFormdata.privacyChecked);

      dispatch(resetSignupData());
      dispatch(resetPageData());
    }
  }, [prevPath]);

  useEffect(() => {
    if (error === null) {
      return;
    }

    switch (error) {
      case 'auth/email-already-in-use':
        setEmailErrMessage('이미 사용 중인 이메일입니다');
        break;
      case 'auth/network-request-failed':
        setSubmitErrMessage('네트워크 연결에 실패했습니다');
        break;
      case 'auth/invalid-email':
        setEmailErrMessage('잘못된 이메일 형식입니다');
        break;
      case 'auth/internal-error':
        setSubmitErrMessage('잘못된 요청입니다');
        break;
      case 'auth/weak-password':
        setPasswordErrMessage('6자 이상 입력해주세요');
        break;
      default:
        setSubmitErrMessage('회원가입에 실패했습니다');
    }
  }, [error]);

  useEffect(() => {
    if (
      !email ||
      !password ||
      emailErrMessage ||
      passwordErrMessage ||
      password !== passwordConfirm ||
      !allChecked
    ) {
      setDisabledSubmitBtn(true);
    } else {
      setDisabledSubmitBtn(false);
    }
  }, [email, password, passwordConfirm, allChecked]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signup({ email, password, displayName, file });
  };

  const handleEmailInp = (target: HTMLInputElement) => {
    setEmail(target.value);

    if (target.validity.valueMissing) {
      setEmailErrMessage('이메일을 입력해주세요');
    } else {
      setEmailErrMessage('');
    }
  };

  const handlePasswordInp = (target: HTMLInputElement) => {
    setPassword(target.value);

    if (target.validity.valueMissing) {
      setPasswordErrMessage('비밀번호를 입력해주세요');
    } else if (target.validity.tooShort) {
      setPasswordErrMessage('6자 이상 입력해주세요');
    } else {
      setPasswordErrMessage('');
    }

    if (target.value === passwordConfirm) {
      setPasswordConfirmErrMessage('');
    }
  };

  const handlePasswordConfirmInp = (value: string) => {
    setPasswordConfirm(value);

    if (value !== password) {
      setPasswordConfirmErrMessage('비밀번호가 일치하지 않습니다');
    } else {
      setPasswordConfirmErrMessage('');
    }
  };

  const handleInp = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubmitErrMessage('');

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

  useEffect(() => {
    if (ageChecked && termsChecked && privacyChecked) {
      setAllChecked(true);
    } else {
      setAllChecked(false);
    }
  }, [ageChecked, termsChecked, privacyChecked]);

  const setSignupData = () => {
    const toChangeState = {
      profileImgFiles,
      displayName,
      email,
      password,
      passwordConfirm,

      emailErrMessage,
      passwordErrMessage,
      passwordConfirmErrMessage,

      disabledSubmitBtn,

      allChecked,
      ageChecked,
      termsChecked,
      privacyChecked,
    };

    dispatch(setPrevPath('signup'));
    dispatch(setSignupForm(toChangeState));
  };

  return (
    <>
      <Helmet>
        <title>Signup | MOMOO</title>
      </Helmet>

      <StyledSignup
        $checkboxIcon={checkbox}
        $checkboxCheckedIcon={checkboxChecked}
      >
        <div className="container">
          {clientWitch < 431 && (
            <h1>
              <img src={Logo} alt="로고" />
            </h1>
          )}
          <article>
            <Link to="/login">Login</Link>
            <h2>Signup</h2>
          </article>
          <form onSubmit={handleSubmit}>
            <label
              htmlFor="profile-inp"
              className={imgHasFocus ? 'profile focus' : 'profile'}
            >
              <img src={src || ProfileBasicImg} alt="프로필 사진" />
              <img src={EditCircle} alt="변경하기" />
            </label>
            <input
              id="profile-inp"
              type="file"
              className="a11y-hidden"
              onClick={(e) =>
                ((e.currentTarget as HTMLInputElement).value = '')
              }
              onChange={(e) => {
                setProfileImage(e.target.files);
                setProfileImgFiles(e.target.files);
              }}
              onFocus={() => setImgHasFocus(true)}
              onBlur={() => setImgHasFocus(false)}
            />
            <label htmlFor="displayName-inp" className="a11y-hidden">
              사용자 이름
            </label>
            <StyledInput
              id="displayName-inp"
              placeholder="username"
              type="text"
              value={displayName}
              onChange={handleInp}
            />
            <label htmlFor="email-inp" className="a11y-hidden">
              이메일
            </label>
            <StyledInput
              id="email-inp"
              placeholder="email"
              type="email"
              value={email}
              maxLength={98}
              onChange={handleInp}
              required
            />
            {emailErrMessage && (
              <strong role="alert">{`*${emailErrMessage}`}</strong>
            )}
            <label htmlFor="password-inp" className="a11y-hidden">
              비밀번호
            </label>
            <StyledInput
              id="password-inp"
              placeholder="password"
              type="password"
              value={password}
              minLength={6}
              maxLength={20}
              onChange={handleInp}
              required
            />
            {passwordErrMessage && (
              <strong role="alert">{`*${passwordErrMessage}`}</strong>
            )}
            <label htmlFor="passwordConfirm-inp" className="a11y-hidden">
              비밀번호 재확인
            </label>
            <StyledInput
              id="passwordConfirm-inp"
              placeholder="password confirm"
              type="password"
              value={passwordConfirm}
              minLength={6}
              maxLength={20}
              onChange={handleInp}
              required
            />
            {passwordConfirmErrMessage && (
              <strong role="alert">{`*${passwordConfirmErrMessage}`}</strong>
            )}
            <div className="agree">
              <h3>MOMOO 서비스 약관에 동의해 주세요.</h3>
              <label className={allChecked ? 'checkbox checked' : 'checkbox'}>
                모두 동의합니다.
                <input
                  type="checkbox"
                  className="a11y-hidden"
                  onChange={(e) => {
                    setAllChecked(e.currentTarget.checked);

                    if (e.currentTarget.checked) {
                      setAgeChecked(true);
                      setTermsChecked(true);
                      setPrivacyChecked(true);
                    } else {
                      setAgeChecked(false);
                      setTermsChecked(false);
                      setPrivacyChecked(false);
                    }
                  }}
                  checked={allChecked}
                />
              </label>
              <strong className="a11y-hidden">동의 항목</strong>
              <ul>
                <li>
                  <label
                    className={ageChecked ? 'checkbox checked' : 'checkbox'}
                  >
                    [필수] 만 14세 이상입니다.
                    <input
                      type="checkbox"
                      className="a11y-hidden"
                      onChange={(e) => setAgeChecked(e.currentTarget.checked)}
                      checked={ageChecked}
                    />
                  </label>
                </li>
                <li>
                  <label
                    className={termsChecked ? 'checkbox checked' : 'checkbox'}
                  >
                    [필수] 이용약관
                    <input
                      type="checkbox"
                      className="a11y-hidden"
                      onChange={(e) => setTermsChecked(e.currentTarget.checked)}
                      checked={termsChecked}
                    />
                  </label>
                  <button className="link" type="button">
                    <img
                      src={arrow}
                      alt="자세히 보기"
                      onClick={() => {
                        navigate('/terms');
                        setSignupData();
                      }}
                    />
                  </button>
                </li>
                <li>
                  <label
                    className={privacyChecked ? 'checkbox checked' : 'checkbox'}
                  >
                    [필수] 데이터 정책
                    <input
                      type="checkbox"
                      className="a11y-hidden"
                      onChange={(e) =>
                        setPrivacyChecked(e.currentTarget.checked)
                      }
                      checked={privacyChecked}
                    />
                  </label>
                  <button
                    className="link"
                    type="button"
                    onClick={() => {
                      navigate('/privacy');
                      setSignupData();
                    }}
                  >
                    <img src={arrow} alt="자세히 보기" />
                  </button>
                </li>
              </ul>
            </div>

            <div className="submit-btn-wrap">
              <Button
                size={clientWitch > 1024 ? 'l' : 'm'}
                disabled={disabledSubmitBtn || isPending}
              >
                {isPending ? (
                  <img src={LoadingIcon} alt="계정 생성 중" />
                ) : (
                  'Signup'
                )}
              </Button>
            </div>
          </form>
        </div>

        {submitErrMessage && (
          <AlertModal
            message={submitErrMessage}
            onClose={() => setSubmitErrMessage('')}
          />
        )}
        {imgErrMessage && (
          <AlertModal
            message={imgErrMessage}
            onClose={() => setImgErrMessage('')}
          />
        )}
      </StyledSignup>
    </>
  );
}
