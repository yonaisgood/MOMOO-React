import { Link } from 'react-router-dom';
import StyledMain from './StyledMain';
import StyledH2 from '../../components/StyledH2';
import StyledHomeSection from './StyledHomeSection';
import AddImg from '../../asset/icon/Add.svg';
import ArrayImg from '../../asset/icon/Array.svg';
import Album from '../../components/Album/Album';
import { useState } from 'react';
import NewAlbumModal from '../../components/Modal/NewAlbumModal';
import ArrayModal from '../../components/Modal/ArrayModal';
import MobileHeader from './MobileHeader';

export default function Home() {
  const [isArrayModalOpen, setIsArrayModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const HandleArrayModal = () => {
    setIsArrayModalOpen(true);
  };
  const HandleArrayCloseModal = () => {
    setIsArrayModalOpen(false);
  };

  const HandleAddModal = () => {
    setIsAddModalOpen(true);
  };
  const HandleAddCloseModal = () => {
    setIsAddModalOpen(false);
  };
  return (
    <>
      <MobileHeader />
      <StyledMain>
        <StyledHomeSection>
          <StyledH2>Album</StyledH2>
          <div className="btn-wrap">
            <button type="button" onClick={HandleArrayModal}>
              <img src={ArrayImg} alt="정렬방식 아이콘" />
            </button>
            <button type="button" onClick={HandleAddModal}>
              <img src={AddImg} alt="이미지 추가 아이콘" />
            </button>
          </div>
          <ul>
            <li>
              <Link to="/home">
                <Album />
              </Link>
            </li>
          </ul>
        </StyledHomeSection>
        {isAddModalOpen && <NewAlbumModal onClose={HandleAddCloseModal} />}
        {isArrayModalOpen && <ArrayModal onClose={HandleArrayCloseModal} />}
      </StyledMain>
    </>
  );
}
