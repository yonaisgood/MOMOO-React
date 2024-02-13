import { FormEvent, useEffect, useState } from 'react';

import useAuthContext from '../../hooks/useAuthContext';
import useSetProfileImage from '../../hooks/useSetProfileImage';
import { useUpdateProfile } from '../../hooks/useUpdateProfile';

import StyledInput from '../../components/CommonStyled/StyledInput';
import Button from '../../components/Button/Button/Button';
import BreadcrumbWrap from '../../components/Breadcrumb/BreadcrumbWrap';
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb';
import TopBar from '../../components/Topbar/Topbar';
import DeleteIdModal from './DeleteIdModal';
import StyledSetting from './StyledSetting';

import ProfileBasicImg from '../../asset/image/profile-basic-img.svg';
import EditCircle from '../../asset/icon/EditCircle.svg';
import DeleteIcon from '../../asset/icon/DeleteRed.svg';
import LoadingIcon from '../../asset/icon/LoadingBlack.svg';
import ReauthModal from './ReauthModal';

interface Profile {
  file: File | null;
  displayName: string | null;
  email: string | null;
  password: string | null;
}

export default function Setting() {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [emailErrMessage, setEmailErrMessage] = useState('');
  const [passwordErrMessage, setPasswordErrMessage] = useState('');
  const [passwordConfirmErrMessage, setPasswordConfirmErrMessage] =
    useState('');
  const [disabledEditButton, setDisabledEditButton] = useState(true);
  const [selectedBtn, setSelectedBtn] = useState('프로필 설정');
  const [isDeleteIdModalOpen, setIsDeleteIdModalOpen] = useState(false);
  const [isReauthForDeleteIdModalOpen, setIsReauthForDeleteIdModalOpen] =
    useState(false);
  const [
    isReauthForUpdateProfileModalOpen,
    setIsReauthForUpdateProfileModalOpen,
  ] = useState(false);
  const [readyToUpdateProfile, setReadyToUpdateProfile] = useState(false);
  const [readyToDeleteId, setReadyToDeleteId] = useState(false);
  const [clientWitch, setClientWitch] = useState(
    document.documentElement.clientWidth,
  );
  const [updateProfileIsPending, setUpdateProfileIsPending] = useState(false);
  const { user } = useAuthContext();
  const { setProfile, error: updateProfileError } = useUpdateProfile();

  const { file, setSrc, src, setProfileImage } = useSetProfileImage();

  useEffect(() => {
    window.addEventListener('resize', () => {
      setClientWitch(document.documentElement.clientWidth);
    });
  }, []);

  useEffect(() => {
    if (emailErrMessage || passwordErrMessage || passwordConfirmErrMessage) {
      setDisabledEditButton(true);
      return;
    }

    const userDisplayName = user?.displayName || '';
    const userPhotoURL = user?.photoURL || '';

    if (
      user?.email !== email ||
      userPhotoURL !== src ||
      userDisplayName !== displayName ||
      password
    ) {
      setDisabledEditButton(false);
    } else {
      setDisabledEditButton(true);
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
  }, [user]);

  useEffect(() => {
    if (!readyToUpdateProfile) {
      return;
    }

    (async () => {
      setUpdateProfileIsPending(true);

      const profile: Profile = {
        file,
        displayName: null,
        email: null,
        password,
      };

      if (displayName !== user?.displayName) {
        profile.displayName = displayName;
      }

      if (email !== user?.email) {
        profile.email = email;
      }

      await setProfile(profile);
      // 초기화
      setUpdateProfileIsPending(false);
      setReadyToUpdateProfile(false);
      setPassword('');
      setPasswordConfirm('');
    })();
  }, [readyToUpdateProfile]);

  useEffect(() => {
    if (!updateProfileError) {
      return;
    }

    switch (updateProfileError) {
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
      default:
        alert('프로필 변경에 실패했습니다');
    }
  }, [updateProfileError]);

  useEffect(() => {
    if (readyToDeleteId) {
      setIsDeleteIdModalOpen(true);
      setReadyToDeleteId(false);
    }
  }, [readyToDeleteId]);

  const deleteId = async () => {
    setIsReauthForDeleteIdModalOpen(true);
    setSelectedBtn('회원 탈퇴');
  };

  const updateProfile = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisabledEditButton(true);

    if (email !== user?.email || password) {
      setIsReauthForUpdateProfileModalOpen(true);
    } else {
      setReadyToUpdateProfile(true);
    }
  };

  const handlePasswordInp = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);

    if (e.target.validity.tooShort) {
      setPasswordErrMessage('6자 이상 입력해주세요');
    } else {
      setPasswordErrMessage('');
    }

    if (e.target.value === passwordConfirm) {
      setPasswordConfirmErrMessage('');
    }
  };

  const handlePasswordConfirmInp = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirm(e.target.value);

    if (e.target.value !== password) {
      setPasswordConfirmErrMessage('비밀번호가 일치하지 않습니다');
    } else {
      setPasswordConfirmErrMessage('');
    }
  };

  const handleEmailInp = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);

    if (e.target.validity.valueMissing) {
      setEmailErrMessage('필수 항목입니다');
    } else {
      setEmailErrMessage('');
    }
  };

  return (
    <>
      {clientWitch <= 430 && <TopBar tit="Setting" />}
      <StyledSetting>
        {clientWitch > 1024 && (
          <Breadcrumb
            navList={[
              { path: 'home', text: 'Home' },
              { path: 'setting', text: 'Setting' },
            ]}
          />
        )}
        {clientWitch > 430 && clientWitch <= 1024 && (
          <BreadcrumbWrap
            navList={[
              { path: 'home', text: 'Home' },
              { path: 'setting', text: 'Setting' },
            ]}
            title="Setting"
          />
        )}
        <div className="container">
          {clientWitch > 430 && (
            <article>
              {clientWitch > 1024 && <h2>Setting</h2>}
              <button
                type="button"
                className={selectedBtn === '프로필 설정' ? 'selected' : ''}
                onClick={() => setSelectedBtn('프로필 설정')}
              >
                프로필 설정
              </button>
              <button
                type="button"
                className={selectedBtn === '회원 탈퇴' ? 'selected' : ''}
                onClick={deleteId}
              >
                회원 탈퇴
              </button>
            </article>
          )}
          <form onSubmit={updateProfile}>
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

            <label htmlFor="username-inp" className="a11y-hidden">
              사용자 이름
            </label>
            <StyledInput
              id="username-inp"
              placeholder="username"
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
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
              onChange={handleEmailInp}
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
              value={password}
              onChange={handlePasswordInp}
            />
            <strong role="alert">
              {passwordErrMessage && `*${passwordErrMessage}`}
            </strong>
            <label htmlFor="password-inp" className="a11y-hidden">
              비밀번호 재확인
            </label>
            <StyledInput
              id="password-inp"
              placeholder="password confirm"
              type="password"
              minLength={6}
              maxLength={20}
              value={passwordConfirm}
              onChange={handlePasswordConfirmInp}
            />
            <strong role="alert">
              {passwordConfirmErrMessage && `*${passwordConfirmErrMessage}`}
            </strong>
            <Button
              size={clientWitch > 1024 ? 'l' : 's'}
              disabled={disabledEditButton}
            >
              {updateProfileIsPending ? (
                <img src={LoadingIcon} alt="저장 중" />
              ) : (
                'Save'
              )}
            </Button>
          </form>
          {clientWitch <= 430 && (
            <button type="button" className="delete-btn" onClick={deleteId}>
              Delete account
              <img src={DeleteIcon} alt="" />
            </button>
          )}
        </div>

        {isDeleteIdModalOpen && (
          <DeleteIdModal
            onClose={() => {
              setIsDeleteIdModalOpen(false);
              setSelectedBtn('프로필 설정');
            }}
          />
        )}
        {isReauthForUpdateProfileModalOpen && (
          <ReauthModal
            setIsModalOpen={setIsReauthForUpdateProfileModalOpen}
            setIsReauthSuccess={setReadyToUpdateProfile}
            cancel={() => {
              setIsReauthForUpdateProfileModalOpen(false);
              setDisabledEditButton(false);
            }}
          />
        )}
        {isReauthForDeleteIdModalOpen && (
          <ReauthModal
            setIsModalOpen={setIsReauthForDeleteIdModalOpen}
            setIsReauthSuccess={setReadyToDeleteId}
            cancel={() => {
              setIsReauthForDeleteIdModalOpen(false);
              setSelectedBtn('프로필 설정');
            }}
          />
        )}
      </StyledSetting>
    </>
  );
}
