import StyledNav from './StyledNav';
import MyPopup from '../MyPopup/MyPopup';
import Upload from '../Upload/Upload';
import LogoImg from '../../asset/icon/Logo.svg';
import UploadImg from '../../asset/icon/UploadPc.svg';
import MypageImg from '../../asset/icon/ProfilePc.svg';
import { useState } from 'react';

export default function Nav() {
  const [openUploadModal, setOpenUploadModal] = useState(false);
  const [openMyModal, setOpenMyModal] = useState(false);

  const openUploadModalFunc = () => {
    setOpenUploadModal(true);
    document.body.classList.add('modal-open');
  };

  const openMyModalFunc = () => {
    setOpenMyModal(true);
  };

  return (
    <StyledNav>
      <div className="navBtn">
        <button className="my" onClick={openMyModalFunc}>
          <img src={UploadImg} alt="업로드 이미지" />
          <p>Upload</p>
        </button>
        <button className="upload" onClick={openUploadModalFunc}>
          <img src={MypageImg} alt="마이페이지 이미지" />
          <p>Mypage</p>
        </button>
      </div>
      <img className="logoImg" src={LogoImg} alt="로고이미지" />
      {openUploadModal && (
        <div className="modal-overlay">
          <Upload setOpenPopup={setOpenUploadModal} />
        </div>
      )}
      {openMyModal && <MyPopup setOpenPopup={setOpenMyModal} />}
    </StyledNav>
  );
}
