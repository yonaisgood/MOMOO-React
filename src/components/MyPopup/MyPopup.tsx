import useAuthContext from '../../hooks/useAuthContext';
import StyledDialog from './StyledDialog';
import SettingIcon from '../../asset/icon/Setting.svg';
import DocumentIcon from '../../asset/icon/Document.svg';
import PolicyIcon from '../../asset/icon/Policy.svg';
import Github from '../../asset/icon/Github.svg';
import LogoutIcon from '../../asset/icon/Logout.svg';
import BasicProfile from '../../asset/image/profile-basic-img.svg';
import XIcon from '../../asset/icon/X.svg';
import { Link } from 'react-router-dom';

export default function MyPopup() {
  const { user } = useAuthContext();

  return (
    <StyledDialog role='dialog'>
      {user && (
        <>
          <section className='profile'>
            <img src={user.photoURL || BasicProfile} alt='프로필 사진' />
            <div className='displayName'>{user.displayName}</div>
            <div className='email'>{user.email}</div>
          </section>
          <section className='menu'>
            <ul>
              <li>
                <Link to='/setting'>
                  <img src={SettingIcon} alt='' />
                  Setting
                </Link>
              </li>
              <li>
                <Link to='/setting'>
                  <img src={DocumentIcon} alt='' />
                  Site Terms
                </Link>
              </li>
              <li>
                <Link to='/setting'>
                  <img src={PolicyIcon} alt='' />
                  Privacy policy
                </Link>
              </li>
              <li>
                <a
                  href='https://github.com/yonainthefish/MoMoo'
                  rel='noopener'
                  target='_blank'
                >
                  <img src={Github} alt='' />
                  GitHub
                </a>
              </li>
              <li>
                <button type='button'>
                  <img src={LogoutIcon} alt='' />
                  Logout
                </button>
              </li>
            </ul>
          </section>
          <div className='footer'>MOMOO 2023. All Right Reserved.</div>
          <button className='close' type='button'>
            <img src={XIcon} alt='닫기' />
          </button>
        </>
      )}
    </StyledDialog>
  );
}
