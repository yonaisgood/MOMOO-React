import { SyntheticEvent, useEffect, useState } from 'react';
import KakaoMap from '../Map/KakaoMap';
import Preview from '../FileUpload/Preview';
import Accordion from '../Accordion/Accordion';
import MultipleAccordion from '../Accordion/MultipleAccordion';
import Arrow from '../../asset/icon/Arrow.svg';
import CloseMobileIcon from '../../asset/icon/X-Small.svg';
import CloseIcon from '../../asset/icon/X-White.svg';
import * as Styled from './UploadStyle';
import StyledOverlay from './StyledOverlay';
import GetAccordionData from './accordionData';
import uploadImageToStorage from './UploadImageToStorage';
import useAuthContext from '../../hooks/useAuthContext';
import useEditContext from '../../hooks/useEditContext';
import useGetFeedData from '../../hooks/useGetFeedData';
import useEditFeed from '../../hooks/useEditFeed';
import useGetSavedAlbumList from '../../hooks/useGetSavedAlbumList';
import {
  useaddFeedIdFromFeedList,
  useremoveFeedIdFromFeedList,
} from '../../hooks/useUpdateFeedList';
import { useNavigate } from 'react-router-dom';

export default function EditFeed() {
  interface AccordionData {
    question: string;
    answer: string[];
  }

  interface AlbumIdData {
    albumName: string;
    docId: string;
  }

  const [kakaoMapVisible, setKakaoMapVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [selectedAlbumList, setSelectedAlbumList] = useState<string[]>([]);
  const [savedAlbumList, setSavedAlbumList] = useState<string[]>([]);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [selectedWeatherImage, setSelectedWeatherImage] = useState<string>('');
  const [selectedEmotionImage, setSelectedEmotionImage] = useState<string>('');
  const [file, setFile] = useState<FileList | null>(null);
  const [imgUrlList, setImgUrlList] = useState([]);
  const getFeedData = useGetFeedData();
  const [clientWitch, setClientWitch] = useState(
    document.documentElement.clientWidth,
  );
  const [accordionData, setAccordionData] = useState<AccordionData[]>([]);
  const [albumIdData, setAlbumIdData] = useState<AlbumIdData[]>([]);

  const { user } = useAuthContext();
  const { setIsEditModalOpen, feedIdtoEdit, setFeedIdtoEdit } =
    useEditContext();
  const navigate = useNavigate();

  const getAccordionData = GetAccordionData();
  const editFeed = useEditFeed();
  const getSavedAlbumList = useGetSavedAlbumList();
  const addFeedIdFromFeedList = useaddFeedIdFromFeedList();
  const removeFeedIdFromFeedList = useremoveFeedIdFromFeedList();

  useEffect(() => {
    window.addEventListener('resize', () => {
      setClientWitch(document.documentElement.clientWidth);
    });

    const setFeedData = async () => {
      const data = await getFeedData(feedIdtoEdit);

      if (data) {
        setTitle(data.title);
        setText(data.text);
        setSelectedAddress(data.selectedAddress);
        setSelectedWeatherImage(data.weatherImage);
        setSelectedEmotionImage(data.emotionImage);
        setImgUrlList(data.imageUrl);
      }
    };

    const setSavedAlbumData = async () => {
      const data = await getSavedAlbumList(feedIdtoEdit);

      if (data) {
        setSelectedAlbumList(data.map((v) => v.data().name));
        setSavedAlbumList(data.map((v) => v.id));
      }
    };

    const SetAcoordionData = async () => {
      if (user) {
        const result = await getAccordionData();
        setAccordionData(result.accordionData);
        setAlbumIdData(result.albumIdData);
      }
    };

    setFeedData();
    setSavedAlbumData();
    SetAcoordionData();
  }, []);

  const toggleKakaoMap = () => {
    setKakaoMapVisible(!kakaoMapVisible);
  };

  const closeEditFeedModal = () => {
    setIsEditModalOpen(false);
    setFeedIdtoEdit('');
  };

  const handleAddressSelect = (selectedAddress: string) => {
    setSelectedAddress(selectedAddress);
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (title.trim() === '') {
      alert('제목을 입력해 주세요');
      return;
    }

    try {
      let downloadURLs: string[] = imgUrlList;

      if (file !== null) {
        downloadURLs = await uploadImageToStorage(file, 'feed');
      }

      const editData = {
        title: title,
        text: text,
        selectedAddress: selectedAddress,
        weatherImage: selectedWeatherImage,
        emotionImage: selectedEmotionImage,
        imageUrl: downloadURLs,
      };

      await editFeed(editData);
      navigate(`/feed/${feedIdtoEdit}`);
      closeEditFeedModal();

      // update feedList
      selectedAlbumList.forEach(async (selectedAlbumName) => {
        let selectedAlbumId = '';

        for (const iterator of albumIdData) {
          if (selectedAlbumName === iterator.albumName) {
            selectedAlbumId = iterator.docId;
          }
        }

        if (!savedAlbumList.includes(selectedAlbumId)) {
          await addFeedIdFromFeedList(feedIdtoEdit, selectedAlbumId);
        }
      });

      savedAlbumList.forEach(async (savedAlbumId) => {
        if (!selectedAlbumList.includes(savedAlbumId)) {
          await removeFeedIdFromFeedList(feedIdtoEdit, savedAlbumId);
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <StyledOverlay>
      <Styled.UploadWrapper>
        <Styled.UploadHeader>
          {clientWitch <= 430 && (
            <Styled.MobileCloseBtn onClick={closeEditFeedModal}>
              <img src={CloseMobileIcon} alt="닫기" />
            </Styled.MobileCloseBtn>
          )}
          <h1>게시물 수정</h1>
          <button className="uploadBtn" type="submit" onClick={handleSubmit}>
            완료
          </button>
        </Styled.UploadHeader>
        <Styled.UploadContents>
          <Styled.PicPart>
            <Preview setFile={setFile} imgUrlList={imgUrlList} />
          </Styled.PicPart>
          <Styled.SelectPart>
            <div className="inputWrapper">
              <input
                type="text"
                placeholder="제목을 입력해주세요"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                required
              />
            </div>
            <form className="uploadInfo">
              <textarea
                id="uploadText"
                maxLength={1000}
                cols={30}
                rows={10}
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                }}
                placeholder="문구를 입력해주세요..."
              ></textarea>
            </form>
            <Styled.LocationContents onClick={toggleKakaoMap}>
              <div className="locationHead">
                {selectedAddress ? (
                  <p>선택한 주소: {selectedAddress}</p>
                ) : (
                  <h2>위치 추가</h2>
                )}
                <img
                  className={kakaoMapVisible ? 'rotate' : ''}
                  src={Arrow}
                  alt="위치토글아이콘"
                />
              </div>
            </Styled.LocationContents>
            {kakaoMapVisible && (
              <Styled.KakaoMapContainer>
                <KakaoMap
                  onAddressSelect={(address) => handleAddressSelect(address)}
                />
              </Styled.KakaoMapContainer>
            )}
            <Styled.AccordionContents>
              {accordionData.slice(1, 2).map((data, index) => (
                <MultipleAccordion
                  key={0}
                  question={accordionData[0].question}
                  answer={accordionData[0].answer.join(',')}
                  selectedAlbum={selectedAlbumList}
                  setSelectedAlbum={setSelectedAlbumList}
                />
              ))}
              {accordionData.slice(1, 3).map((data, index) => (
                <Accordion
                  key={index}
                  question={data.question}
                  answer={data.answer.join(',')}
                  selectedImages={
                    data.question === '오늘의 날씨'
                      ? selectedWeatherImage
                      : selectedEmotionImage
                  }
                  setSelectedImages={
                    data.question === '오늘의 날씨'
                      ? setSelectedWeatherImage
                      : setSelectedEmotionImage
                  }
                />
              ))}
            </Styled.AccordionContents>
          </Styled.SelectPart>
        </Styled.UploadContents>
      </Styled.UploadWrapper>
      <Styled.CloseBtn className="closeBtn" onClick={closeEditFeedModal}>
        <img src={CloseIcon} alt="닫기버튼" />
      </Styled.CloseBtn>
    </StyledOverlay>
  );
}
