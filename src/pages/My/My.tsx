import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import useAuthContext from '../../hooks/useAuthContext';
import useLogout from '../../hooks/useLogout';

import AlertModal from '../../components/Modal/AlertModal/AlertModal';
import StyledMy from './StyledMy';

import BasicProfile from '../../asset/image/profile-basic-img.svg';
import SettingIcon from '../../asset/icon/Setting.svg';
import DocumentIcon from '../../asset/icon/Document.svg';
import PolicyIcon from '../../asset/icon/Policy.svg';
import Github from '../../asset/icon/Github.svg';
import LogoutIcon from '../../asset/icon/Logout.svg';
import { useEffect, useState } from 'react';

export default function My() {
  const { user } = useAuthContext();
  const [submitErrMessage, setSubmitErrMessage] = useState('');
  const { logout, error } = useLogout();

  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return;
  }

  useEffect(() => {
    if (error) {
      setSubmitErrMessage(error);
    }
  }, [error]);

  return (
    <>
      <Helmet>
        <title>MY | MOMOO</title>
      </Helmet>

      <StyledMy>
        <section className="profile">
          <img src={user.photoURL || BasicProfile} alt="프로필 사진" />
          <div className="displayName">{user.displayName}</div>
          <div className="email">{user.email}</div>
        </section>
        <section className="menu">
          <ul>
            <li>
              <Link to="/setting">
                <img src={SettingIcon} alt="" />
                Setting
              </Link>
            </li>
            <li>
              <Link to="/terms">
                <img src={DocumentIcon} alt="" />
                Terms of use
              </Link>
            </li>
            <li>
              <Link to="/privacy">
                <img src={PolicyIcon} alt="" />
                Privacy policy
              </Link>
            </li>
            <li>
              <a
                href="https://github.com/yonainthefish/MoMoo"
                rel="noopener"
                target="_blank"
              >
                <img src={Github} alt="" />
                GitHub
              </a>
            </li>
            <li>
              <button type="button" onClick={logout}>
                <img src={LogoutIcon} alt="" />
                Logout
              </button>
            </li>
          </ul>
        </section>
        <div className="footer">MOMOO 2023. All Right Reserved.</div>

        {submitErrMessage && (
          <AlertModal
            title={submitErrMessage}
            onClose={() => setSubmitErrMessage('')}
          />
        )}
      </StyledMy>
    </>
  );
}
