import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import useUploadContext from '../../hooks/useUploadContext';

import MyPopup from '../MyPopup/MyPopup';
import StyledNav from './StyledNav';

import HomeImg from '../../asset/icon/HomePc.svg';
import LogoImg from '../../asset/icon/Logo.svg';
import LogoColImg from '../../asset/icon/Logo-col.svg';
import UploadImg from '../../asset/icon/UploadPc.svg';
import MypageImg from '../../asset/icon/ProfilePc.svg';

export default function Nav() {
  const [openMyModal, setOpenMyModal] = useState(false);
  const [clientWitch, setClientWitch] = useState(
    document.documentElement.clientWidth,
  );
  const { setIsUploadModalOpen } = useUploadContext();

  useEffect(() => {
    window.addEventListener('resize', () => {
      setClientWitch(document.documentElement.clientWidth);
    });
  }, []);

  const openUploadModalFunc = () => {
    setIsUploadModalOpen(true);
  };

  const openMyModalFunc = () => {
    setOpenMyModal(true);
  };

  return (
    <>
      {clientWitch > 430 && (
        <StyledNav>
          <div className="navBtn">
            <Link to="/home">
              <button type="button" className="home">
                <img src={HomeImg} alt="홈 아이콘" />
                <p>Home</p>
              </button>
            </Link>
            <button
              type="button"
              className="upload"
              onClick={openUploadModalFunc}
            >
              <img src={UploadImg} alt="업로드 아이콘" />
              <p>Upload</p>
            </button>
            <button type="button" className="my" onClick={openMyModalFunc}>
              <img src={MypageImg} alt="마이페이지 아이콘" />
              <p>Mypage</p>
            </button>
          </div>
          <Link to="/home">
            <h1 className="a11y-hidden">MoMoo</h1>
            <img
              className="logoImg"
              src={clientWitch > 1024 ? LogoColImg : LogoImg}
              alt="로고이미지"
            />
          </Link>
          {openMyModal && <MyPopup setOpenPopup={setOpenMyModal} />}
        </StyledNav>
      )}
    </>
  );
}
