import { useEffect, useState } from 'react';
import StyledFeedItem from './StyledFeedItem';
import Modal from '../Modal/SelectModal';
import SeeMore from '../../asset/icon/More.svg';
import { useNavigate, useParams } from 'react-router-dom';
import useGetFeedData from '../../hooks/useGetFeedData';
import { DocumentData } from '@firebase/firestore';
import Carousel from '../carousel/Carousel';
import useEditContext from '../../hooks/useEditContext';
import AlertModal from '../Modal/AlertModal';
import ChangeAlbumModal from '../Modal/ChangeAlbumModal';
import GetAccordionData from '../Upload/accordionData';
import useAuthContext from '../../hooks/useAuthContext';

export default function FeedItem() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [changeModalOpen, setChangeModalOpen] = useState(false);
  const [changeAlbumModalOpen, setChangeAlbumModalOpen] = useState(false);
  const [feedData, setFeedData] = useState<DocumentData | null>(null);
  const [time, setTime] = useState('');
  const [InvalidId, setInvalidId] = useState(false);
  const { isEditModalOpen } = useEditContext();
  const { user } = useAuthContext();
  const { id } = useParams();
  const getFeedData = useGetFeedData();
  const navigate = useNavigate();
  const getAccordionData = GetAccordionData();

  interface AlbumIdData {
    albumName: string;
    docId: string;
  }

  interface Object {
    question: string;
    answer: string[];
  }

  const [accordionData, setAccordionData] = useState<Object[]>([]);
  const [albumIdData, setAlbumIdData] = useState<AlbumIdData[]>([]);

  if (!id) {
    navigate('/404');
    return;
  }

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const result = await getAccordionData();
        console.log(result);
        setAccordionData(result.accordionData);
        setAlbumIdData(result.albumIdData);
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
  }, [, isEditModalOpen]);

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

  return (
    <>
      {InvalidId ? (
        <div>존재하지 않는 게시물입니다</div>
      ) : (
        feedData && (
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
              <button
                className="more"
                type="button"
                onClick={handleSeeMoreClick}
              >
                <img src={SeeMore} alt="더보기 버튼" />
              </button>
            </section>
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
                setChangeAlbumModalOpen={setChangeAlbumModalOpen}
                feedId={id}
                onClose={handleCloseModal}
              />
            )}
            {deleteModalOpen && <AlertModal onClose={handleDeleteCloseModal} />}
            {changeAlbumModalOpen && (
              <ChangeAlbumModal
                answer={accordionData[0].answer.join(',')}
                onClose={handleChangeAlbumModal}
              />
            )}
          </StyledFeedItem>
        )
      )}
    </>
  );
}
