import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DocumentData } from '@firebase/firestore';

import useGetFeedData from '../../../hooks/useGetFeedData';
import useEditContext from '../../../hooks/useEditContext';
import useAuthContext from '../../../hooks/useAuthContext';

import ChangeAlbumModal from '../../../components/Modal/ChangeAlbumModal/ChangeAlbumModal';
import GetAccordionData from '../../../components/Upload/GetAccordionData';
import DeleteFeedModal from './DeleteFeedModal';
import Modal from '../../../components/Modal/SelectModal/SelectModal';
import Carousel from '../../../components/Carousel/Carousel';
import LoadingComponent from '../../../components/Loading/LoadingComponent';
import StyledFeedItem from './StyledFeedItem';

import SeeMore from '../../../asset/icon/More.svg';

interface AccordionItemData {
  question: string;
  answer: string[];
}

export default function FeedItem() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [changeAlbumModalOpen, setChangeAlbumModalOpen] = useState(false);
  const [feedData, setFeedData] = useState<DocumentData | null>(null);
  const [time, setTime] = useState('');
  const [InvalidId, setInvalidId] = useState(false);
  const [accordionData, setAccordionData] = useState<AccordionItemData[]>([]);
  const { isEditModalOpen } = useEditContext();
  const { user } = useAuthContext();
  const { id } = useParams();
  const getFeedData = useGetFeedData();
  const navigate = useNavigate();
  const getAccordionData = GetAccordionData();

  if (!id) {
    navigate('/404');
    return;
  }

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const result = await getAccordionData();
        setAccordionData(result.accordionData || []);
      }
    };
    fetchData();
  }, []);

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
  }, [isEditModalOpen]);

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

  const handleChangeAlbumModal = () => {
    setChangeAlbumModalOpen(false);
    setIsModalOpen(false);
  };

  if (InvalidId) {
    return <div>존재하지 않는 게시물입니다</div>;
  }

  return (
    <>
      {!feedData && <LoadingComponent />}
      {feedData && (
        <StyledFeedItem>
          <Carousel imgUrlList={feedData.imageUrl}></Carousel>
          <section className="contentsSection">
            {feedData.emotionImage && feedData.weatherImage && (
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
              </div>
            )}
            <button className="more" type="button" onClick={handleSeeMoreClick}>
              <img src={SeeMore} alt="더보기 버튼" />
            </button>
          </section>
          <h3>{feedData.title}</h3>
          {feedData.text && <p className="detailText">{feedData.text}</p>}
          {feedData.selectedAddress && (
            <p className="locationSection">{feedData.selectedAddress}</p>
          )}
          <time dateTime={time} className="date">
            {time.replace(/-/gi, '.')}
          </time>
          {isModalOpen && (
            <Modal
              setDeleteModalOpen={setDeleteModalOpen}
              setChangeAlbumModalOpen={setChangeAlbumModalOpen}
              feedId={id}
              onClose={handleCloseModal}
            />
          )}
          {deleteModalOpen && (
            <DeleteFeedModal
              onClose={handleDeleteCloseModal}
              imgUrlList={feedData.imageUrl}
            />
          )}
          {changeAlbumModalOpen && (
            <ChangeAlbumModal
              answer={accordionData[0].answer.join(',')}
              onClose={handleChangeAlbumModal}
            />
          )}
        </StyledFeedItem>
      )}
    </>
  );
}
