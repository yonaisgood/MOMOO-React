import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

import useGetAlbumList from '../../hooks/useGetAlbumList';

import StyledH2 from '../../components/CommonStyled/StyledH2';
import Album from '../../components/Album/Album';
import NewAlbumModal from '../../components/Modal/NewAlbumModal/NewAlbumModal';
import ArrayModal from '../../components/Modal/ArrayModal/ArrayModal';
import MobileHeader from './MobileHeader';
import { StyledMain, StyledHomeSection } from './StyledHome';

import AddImg from '../../asset/icon/Add.svg';
import ArrayImg from '../../asset/icon/Array.svg';

export default function Home() {
  const [isArrayModalOpen, setIsArrayModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [clientWitch, setClientWitch] = useState(
    document.documentElement.clientWidth,
  );
  const { albumDataList, oldestAlbumList } = useGetAlbumList();

  useEffect(() => {
    window.addEventListener('resize', () => {
      setClientWitch(document.documentElement.clientWidth);
    });
  }, []);

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
  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <>
      <Helmet>
        <title>홈 | MOMOO</title>
      </Helmet>

      {clientWitch <= 430 && <MobileHeader />}
      <StyledMain>
        <StyledHomeSection>
          <StyledH2 className="album-title">Album</StyledH2>
          <div className="btn-wrap">
            <button type="button" onClick={HandleArrayModal}>
              <img src={ArrayImg} alt="정렬방식 아이콘" />
            </button>
            <button type="button" onClick={HandleAddModal}>
              <img src={AddImg} alt="이미지 추가 아이콘" />
            </button>
          </div>
          <ul>
            {(selectedOption === 'oldest'
              ? oldestAlbumList
              : albumDataList
            ).map((v) => {
              return (
                <li key={v.createdTime}>
                  <Album albumData={v} />
                </li>
              );
            })}
          </ul>
          {isAddModalOpen && <NewAlbumModal onClose={HandleAddCloseModal} />}
          {isArrayModalOpen && (
            <ArrayModal
              selectedOption={selectedOption}
              onOptionClick={handleOptionClick}
              onClose={HandleArrayCloseModal}
            />
          )}
        </StyledHomeSection>
      </StyledMain>
    </>
  );
}
