import { useEffect, useState } from 'react';
import StyledFeedItem from './StyledFeedItem';
import Modal from '../Modal/SelectModal';
import SeeMore from '../../asset/icon/More.svg';
import { useNavigate, useParams } from 'react-router-dom';
import useGetFeedData from '../../hooks/useGetFeedData';
import { DocumentData } from '@firebase/firestore';
import AlertModal from '../Modal/AlertModal';

export default function FeedItem() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [feedData, setFeedData] = useState<DocumentData | null>(null);
  const [time, setTime] = useState('');
  const [InvalidId, setInvalidId] = useState(false);

  const { id } = useParams();
  const getFeedData = useGetFeedData();
  const navigate = useNavigate();

  if (!id) {
    navigate('/404');
    return;
  }

  useEffect(() => {
    (async () => {
      const feedData = await getFeedData(id);

      if (feedData) {
        setFeedData(feedData);

        const date = new Date(feedData.timestamp.toDate());
        const time = new Date(date.setHours(date.getHours() + 9))
          .toISOString()
          .slice(0, 10);

        setTime(time);
      } else {
        setInvalidId(true);
      }
    })();
  }, []);

  const handleSeeMoreClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteCloseModal = () => {
    setDeleteModalOpen(false);
    setIsModalOpen(false);
  };

  return (
    <>
      {InvalidId ? (
        <div>존재하지 않는 게시물입니다</div>
      ) : (
        feedData && (
          <StyledFeedItem>
            <div className="picSection"></div>
            <div className="iconSection">
              {feedData.emotionImage && (
                <img
                  className="emotion"
                  src={feedData.emotionImage}
                  alt="오늘의 기분"
                />
              )}
              {feedData.weatherImage && (
                <img
                  className="weather"
                  src={feedData.weatherImage}
                  alt="오늘의 날씨"
                />
              )}
              <button type="button" onClick={handleSeeMoreClick}>
                <img className="seeMore" src={SeeMore} alt="더보기 버튼" />
              </button>
            </div>
            <h3>{feedData.title}</h3>
            {feedData.text && <p className="detailText">{feedData.text}</p>}
            {feedData.selectedAddress && (
              <p className="locaSection">{feedData.selectedAddress}</p>
            )}
            <time dateTime={time} className="date">
              {time.replace(/-/gi, '.')}
            </time>
            {isModalOpen && (
              <Modal
                setDeleteModalOpen={setDeleteModalOpen}
                feedId={id}
                onClose={handleCloseModal}
              />
            )}
            {deleteModalOpen && (
              <AlertModal 
              
              onClose={handleDeleteCloseModal} />
            )}
          </StyledFeedItem>
        )
      )}
    </>
  );
}
