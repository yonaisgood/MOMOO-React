import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import useAuthContext from '../../hooks/useAuthContext';
import useLogout from '../../hooks/useLogout';
import useEscDialog from '../../hooks/dialog/useEscDialog';

import AlertModal from '../Modal/AlertModal/AlertModal';
import StyledMyNonModal from './StyledMyNonModal';

import BasicProfile from '../../asset/image/profile-basic-img.svg';
import SettingIcon from '../../asset/icon/Setting.svg';
import DocumentIcon from '../../asset/icon/Document.svg';
import PolicyIcon from '../../asset/icon/Policy.svg';
import Github from '../../asset/icon/Github.svg';
import LogoutIcon from '../../asset/icon/Logout.svg';
import XIcon from '../../asset/icon/X.svg';
import { closeDialogOnClick } from '../../utils/dialog';

interface Props {
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MyNonModal({ setIsDialogOpen }: Props) {
  const { user } = useAuthContext();
  const [submitErrMessage, setSubmitErrMessage] = useState('');
  const { logout, error } = useLogout();

  const dialogRef = useRef<HTMLDialogElement>();
  const menuFirstItemRef = useRef<HTMLAnchorElement>();

  const closeMyNonModal = () => {
    setIsDialogOpen(false);
  };

  useEscDialog(closeMyNonModal);

  useEffect(() => {
    if (error) {
      setSubmitErrMessage(error);
    }
  }, [error]);

  const showNonModal = (node: HTMLDialogElement) => {
    if (node && !dialogRef.current) {
      node.show();
      dialogRef.current = node;
    }
  };

  const focusOnFirstItem = (node: HTMLAnchorElement) => {
    if (node && !menuFirstItemRef.current) {
      node.focus();
      menuFirstItemRef.current = node;
    }
  };

  return (
    <StyledMyNonModal
      role="dialog"
      onClick={(e) => closeDialogOnClick(e, closeMyNonModal)}
      ref={showNonModal}
    >
      {user && (
        <div>
          <section className="profile">
            <img src={user.photoURL || BasicProfile} alt="프로필 사진" />
            <div className="displayName">{user.displayName}</div>
            <div className="email">{user.email}</div>
          </section>
          <section className="menu">
            <ul>
              <li>
                <Link to="/edit-profile" ref={focusOnFirstItem}>
                  <img src={SettingIcon} alt="" />
                  Edit profile
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
          <button
            className="close"
            type="button"
            onClick={() => setIsDialogOpen(false)}
          >
            <img src={XIcon} alt="닫기" />
          </button>
        </div>
      )}
      {submitErrMessage && (
        <AlertModal
          message={submitErrMessage}
          onClose={() => setSubmitErrMessage('')}
        />
      )}
    </StyledMyNonModal>
  );
}
