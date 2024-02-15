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
        <Link to="/">
          <img
            src={location.pathname === '/' ? HomeActiveImg : HomeImg}
            alt="홈 아이콘"
          />
          <p
            style={{
              color:
                location.pathname === '/' ? 'var(--point-dark-400)' : 'inherit',
            }}
          >
            Home
          </p>
        </Link>
        <Link className="upload" to="/upload">
          <img src={UploadImg} alt="업로드 아이콘" />
          <p>Upload</p>
        </Link>
        <Link to="/my">
          <img
            src={location.pathname === '/my' ? MypageActiveImg : MypageImg}
            alt="마이페이지 아이콘"
          />
          <p
            style={{
              color:
                location.pathname === '/my'
                  ? 'var(--point-dark-400)'
                  : 'inherit',
            }}
          >
            Mypage
          </p>
        </Link>
      </div>
    </StyledNav>
  );
}
