import { useEffect, useState } from 'react';
import StyledInput from '../../components/StyledInput';
import StyledMain from './StyledMain';
import Button from '../../components/Button';
import ProfileBasicImg from '../../asset/image/profile-basic-img.svg';
import EditCircle from '../../asset/icon/EditCircle.svg';
import DeleteIcon from '../../asset/icon/DeleteRed.svg';

export default function Setting() {
  const [disabled, setDisabled] = useState(true);
  const [selectedBtn, setSelectedBtn] = useState('프로필 설정');
  const [clientWitch, setClientWitch] = useState(
    document.documentElement.clientWidth
  );

  useEffect(() => {
    window.addEventListener('resize', () => {
      setClientWitch(document.documentElement.clientWidth);
    });
  }, []);

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
        <form>
          <label htmlFor='profile-inp' className='profile'>
            <img src={ProfileBasicImg} alt='프로필 사진' />
            <img src={EditCircle} alt='변경하기' />
          </label>
          <input id='profile-inp' type='file' className='a11y-hidden' />

          <label htmlFor='username-inp' className='a11y-hidden'>
            사용자 이름
          </label>
          <StyledInput id='username-inp' placeholder='username' type='text' />
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
          <label htmlFor='password-inp' className='a11y-hidden'>
            비밀번호 재확인
          </label>
          <StyledInput
            id='password-inp'
            placeholder='password confirm'
            type='password'
          />
          <Button size={clientWitch > 1024 ? 'l' : 's'} disabled={disabled}>
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
