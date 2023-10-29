import { useLocation, Link } from 'react-router-dom';
import StyledNav from './StyledTabBar';
import { useState } from 'react';
import MyPopup from '../MyPopup/MyPopup';
import Upload from '../Upload/Upload';
import HomeImg from '../../asset/icon/HomeMobile.svg';
import HomeActiveImg from '../../asset/icon/HomeMobile-Active.svg';
import UploadImg from '../../asset/icon/UploadMobile.svg';
import MypageImg from '../../asset/icon/ProfileMobile.svg';

export default function TabBar() {
  const location = useLocation();
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
        <button className="home">
          <Link to="/home" className="homeLink">
            <img
              src={location.pathname === '/home' ? HomeActiveImg : HomeImg}
              alt="홈 아이콘"
            />
            <p
              style={{
                color:
                  location.pathname === '/home'
                    ? 'var(--point-dark-400)'
                    : 'inherit',
              }}
            >
              Home
            </p>
          </Link>
        </button>
        <button className="upload" onClick={openUploadModalFunc}>
          <img src={UploadImg} alt="업로드 아이콘" />
          <p>Upload</p>
        </button>
        <button className="my" onClick={openMyModalFunc}>
          <img src={MypageImg} alt="마이페이지 아이콘" />
          <p>Mypage</p>
        </button>
      </div>

      {openUploadModal && (
        <div className="modal-overlay">
          <Upload setOpenPopup={setOpenUploadModal} />
        </div>
      )}
      {openMyModal && <MyPopup setOpenPopup={setOpenMyModal} />}
    </StyledNav>
  );
}
