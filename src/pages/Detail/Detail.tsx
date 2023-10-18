import React, { useState } from 'react';
import {
  NavTemp,
  DetailWrapper,
  DetailLayout,
  DetailContents,
  DepthInfo,
} from './DetailStyle';
import Modal from '../../components/Modal/SelectModal';
import SeeMore from '../../asset/icon/More.svg';

function Detail() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSeeMoreClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <DetailWrapper>
        <NavTemp>logo</NavTemp>
        <DetailLayout>
          <DepthInfo>
            <p>
              Home &#62; Album &#62; <span>우정앨범</span>
            </p>
          </DepthInfo>
          <DetailContents>
            <div className="picSection"></div>
            <div className="iconSection">
              <div className="selectedIcon">
                <img src="" alt="" />
                <img src="" alt="" />
              </div>
              <button onClick={handleSeeMoreClick}>
                <img className="seeMore" src={SeeMore} alt="더보기 버튼" />
              </button>
            </div>
            <div className="textSection">
              <h2>제목</h2>
              <p className="detailText">
                생활 주변에서 일어나는 사소한 일을 소재로 가볍게 쓴 글이므로
                수필에 속하며, 개인적, 주관적, 감성적, 정서적 특성을 지니므로
              </p>
            </div>
            <div className="infoSection">
              <p className="locaSection">위치</p>
              <p className="dateSection">2023.10.03</p>
            </div>
          </DetailContents>
        </DetailLayout>
      </DetailWrapper>
      {isModalOpen && <Modal onClose={handleCloseModal} />}
    </>
  );
}

export default Detail;
