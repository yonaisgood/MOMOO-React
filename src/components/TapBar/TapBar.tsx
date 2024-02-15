import { useLocation, Link } from 'react-router-dom';
import StyledNav from './StyledTapBar';
import HomeImg from '../../asset/icon/HomeMobile.svg';
import HomeActiveImg from '../../asset/icon/HomeMobile-Active.svg';
import UploadImg from '../../asset/icon/UploadMobile.svg';
import MypageImg from '../../asset/icon/ProfileMobile.svg';
import MypageActiveImg from '../../asset/icon/ProfileMobile-Active.svg';

export default function TabBar() {
  const location = useLocation();

  return (
    <StyledNav>
      <div className="navBtn">
        <Link to="/" className={location.pathname === '/' ? 'curr' : ''}>
          <img
            src={location.pathname === '/' ? HomeActiveImg : HomeImg}
            alt="홈 아이콘"
          />
          Home
        </Link>
        <Link
          to="/upload"
          className={location.pathname === '/upload' ? 'curr' : ''}
        >
          <img src={UploadImg} alt="업로드 아이콘" />
          Upload
        </Link>
        <Link to="/my" className={location.pathname === '/my' ? 'curr' : ''}>
          <img
            src={location.pathname === '/my' ? MypageActiveImg : MypageImg}
            alt="마이페이지 아이콘"
          />
          Mypage
        </Link>
      </div>
    </StyledNav>
  );
}
