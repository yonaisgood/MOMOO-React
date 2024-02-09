import { useLocation, Link, useNavigate } from 'react-router-dom';
import StyledNav from './StyledTabBar';
import HomeImg from '../../asset/icon/HomeMobile.svg';
import HomeActiveImg from '../../asset/icon/HomeMobile-Active.svg';
import UploadImg from '../../asset/icon/UploadMobile.svg';
import MypageImg from '../../asset/icon/ProfileMobile.svg';
import MypageActiveImg from '../../asset/icon/ProfileMobile-Active.svg';

export default function TabBar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <StyledNav>
      <div className="navBtn">
        <button type="button">
          <Link to="/" className="homeLink">
            <img
              src={location.pathname === '/' ? HomeActiveImg : HomeImg}
              alt="홈 아이콘"
            />
            <p
              style={{
                color:
                  location.pathname === '/'
                    ? 'var(--point-dark-400)'
                    : 'inherit',
              }}
            >
              Home
            </p>
          </Link>
        </button>
        <button
          type="button"
          className="upload"
          onClick={() => navigate('/upload')}
        >
          <img src={UploadImg} alt="업로드 아이콘" />
          <p>Upload</p>
        </button>
        <button type="button" className="my" onClick={() => navigate('/my')}>
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
        </button>
      </div>
    </StyledNav>
  );
}
