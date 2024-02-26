import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import useUploadContext from '../../hooks/useUploadContext';
import useAuthContext from '../../hooks/useAuthContext';

import MyNonModal from '../MyNonModal/MyNonModal';
import StyledNav from './StyledNav';

import HomeImg from '../../asset/icon/HomePc.svg';
import LogoImg from '../../asset/icon/Logo.svg';
import LogoColImg from '../../asset/icon/Logo-col.svg';
import UploadImg from '../../asset/icon/UploadPc.svg';
import MypageImg from '../../asset/icon/ProfilePc.svg';

export default function Nav() {
  const [openMyDialog, setIsOpenMyDialog] = useState(false);
  const [clientWitch, setClientWitch] = useState(
    document.documentElement.clientWidth,
  );
  const { setIsUploadModalOpen } = useUploadContext();
  const navigate = useNavigate();
  const { user } = useAuthContext();

  useEffect(() => {
    window.addEventListener('resize', () => {
      setClientWitch(document.documentElement.clientWidth);
    });
  }, []);

  const openUploadModalFunc = () => {
    setIsUploadModalOpen(true);
  };

  const openMyDialogFunc = () => {
    setIsOpenMyDialog(true);
  };
  const handleHomeNavigate = () => {
    navigate('/');
  };

  return (
    <>
      <StyledNav>
        <div className="navBtn">
          <button
            type="button"
            className="home"
            onClick={handleHomeNavigate}
            disabled={!user}
          >
            <img src={HomeImg} alt="홈 아이콘" />
            <p>Home</p>
          </button>

          <button
            type="button"
            className="upload"
            onClick={openUploadModalFunc}
            disabled={!user}
          >
            <img src={UploadImg} alt="업로드 아이콘" />
            <p>Upload</p>
          </button>
          <button
            type="button"
            className="my"
            onClick={openMyDialogFunc}
            disabled={!user}
          >
            <img src={MypageImg} alt="마이페이지 아이콘" />
            <p>Mypage</p>
          </button>
        </div>
        {user ? (
          <Link to="/">
            <h1 className="a11y-hidden">MoMoo</h1>
            <img
              className="logoImg"
              src={clientWitch > 1024 ? LogoColImg : LogoImg}
              alt="로고이미지"
            />
          </Link>
        ) : (
          <>
            <h1 className="a11y-hidden">MoMoo</h1>
            <img
              className="logoImg"
              src={clientWitch > 1024 ? LogoColImg : LogoImg}
              alt="로고이미지"
            />
          </>
        )}

        {openMyDialog && <MyNonModal setIsDialogOpen={setIsOpenMyDialog} />}
      </StyledNav>
    </>
  );
}
