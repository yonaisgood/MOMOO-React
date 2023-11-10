import backIcon from '../../asset/icon/ArrowBack.svg';
import { useNavigate } from 'react-router-dom';
import StyledTopbar from './StyledTopbar';

const TopBar = ({ tit }: { tit: string }) => {
  const navigate = useNavigate();

  const handleBtn = () => {
    navigate(-1);
  };

  return (
    <StyledTopbar>
      <h1>{tit}</h1>
      <button type="button" className="back" onClick={handleBtn}>
        <img src={backIcon} alt="이전 페이지로 가기" />
      </button>
    </StyledTopbar>
  );
};

export default TopBar;
