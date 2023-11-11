import { useState } from 'react';
import StyledFeedItem from './StyledFeedItem';
import Modal from '../Modal/SelectModal';
import SeeMore from '../../asset/icon/More.svg';

export default function FeedItem() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSeeMoreClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <StyledFeedItem>
        <div className="picSection"></div>
        <div className="iconSection">
          <img src="" alt="" />
          <img src="" alt="" />
          <button type="button" onClick={handleSeeMoreClick}>
            <img className="seeMore" src={SeeMore} alt="더보기 버튼" />
          </button>
        </div>
        <h3>모무 프로젝트를 위한 나홀로 촬영</h3>
        <p className="detailText">
          생활 주변에서 일어나는 사소한 일을 소재로 가볍게 쓴 글이므로 수필에
          속하며, 개인적, 주관적, 감성적, 정서적 특성을 지니므로
        </p>
        <p className="locaSection">위치</p>
        <time dateTime="2023-10-03" className="date">
          2023.10.03
        </time>
        {isModalOpen && <Modal feedId="1" onClose={handleCloseModal} />}
      </StyledFeedItem>
    </>
  );
}
