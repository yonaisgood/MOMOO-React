import { Link } from 'react-router-dom';
import StyledMain from './StyledMain';
import StyledH2 from '../../components/StyledH2';
import StyledHomeSection from './StyledHomeSection';
import AddImg from '../../asset/icon/Add.svg';
import ArrayImg from '../../asset/icon/Array.svg';
import Album from '../../components/Album/Album';
export default function Home() {
  return (
    <StyledMain>
      <StyledHomeSection>
        <StyledH2>Album</StyledH2>
        <div className="btn-wrap">
          <button>
            <img src={ArrayImg} alt="정렬방식 아이콘" />{' '}
          </button>
          <button>
            <img src={AddImg} alt="이미지 추가 아이콘" />{' '}
          </button>
        </div>
        <ul>
          <li>
            <Link to="/home">
              <Album />
            </Link>
          </li>
          <li>
            <Album />
          </li>
          <li>
            <Album />
          </li>
          <li>
            <Album />
          </li>
          <li>
            <Album />
          </li>
          <li>
            <Album />
          </li>
          <li>
            <Album />
          </li>
        </ul>
      </StyledHomeSection>
    </StyledMain>
  );
}
