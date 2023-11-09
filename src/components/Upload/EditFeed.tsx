import { SyntheticEvent, useEffect, useState } from 'react';
import uploadImageToStorage from './UploadImageToStorage';
import useAuthContext from '../../hooks/useAuthContext';
import Accordion from '../../components/Accordion/Accordion';
import KakaoMap from '../../components/Map/KakaoMap';
import Preview from '../../components/FileUpload/Preview';
import Arrow from '../../asset/icon/Arrow.svg';
import BackIcon from '../../asset/icon/ArrowBack.svg';
import CloseIcon from '../../asset/icon/X-White.svg';
import * as Styled from './UploadStyle';
import accordionData from './accordionData';
import useEditContext from '../../hooks/useEditContext';
import useGetFeedData from '../../hooks/useGetFeedData';
import useEditFeed from '../../hooks/useEditFeed';

export default function EditFeed() {
  const [kakaoMapVisible, setKakaoMapVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [selectedAddress, setSelectedAddress] = useState('');
  const [selectedWeatherImages, setSelectedWeatherImages] =
    useState<string>('');
  const [selectedEmotionImages, setSelectedEmotionImages] =
    useState<string>('');
  const [file, setFile] = useState<FileList | null>(null);

  const { user } = useAuthContext();

  //
  const editFeed = useEditFeed();
  const [imgUrlList, setImgUrlList] = useState([]);
  const getFeedData = useGetFeedData();
  const { setIsEditModalOpen, feedIdtoEdit, setFeedIdtoEdit } =
    useEditContext();

  useEffect(() => {
    const getData = async () => {
      const data = await getFeedData(feedIdtoEdit);

      if (data) {
        setTitle(data.title);
        setText(data.text);
        setSelectedAddress(data.selectedAddress);
        setSelectedWeatherImages(data.weatherImages);
        setSelectedEmotionImages(data.emotionImages);
        setImgUrlList(data.imageUrl);
      }
    };

    getData();
  }, []);
  //

  const toggleKakaoMap = () => {
    setKakaoMapVisible(!kakaoMapVisible);
  };

  const goBack = () => {
    window.history.back();
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
      if (user) {
        let downloadURLs;
        if (file !== null) {
          downloadURLs = await uploadImageToStorage(file, 'feed');
        }

        const editData = {
          title: title,
          text: text,
          selectedAddress: selectedAddress,
          weatherImages: selectedWeatherImages,
          emotionImages: selectedEmotionImages,
          imageUrl: downloadURLs,
        };

        await editFeed(editData);
      } else {
        console.error('사용자가 로그인되지 않았습니다.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Styled.UploadWrapper>
        <Styled.UploadHeader>
          <Styled.BackButton onClick={goBack}>
            <img src={BackIcon} alt="뒤로가기버튼" />
          </Styled.BackButton>
          <h1>게시물 수정</h1>
          <button type="submit" onClick={handleSubmit}>
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
              {accordionData.map((data, index) => (
                <Accordion
                  key={index}
                  question={data.question}
                  answer={data.answer.join(',')}
                  selectedImages={
                    data.question === '오늘의 날씨'
                      ? selectedWeatherImages
                      : selectedEmotionImages
                  }
                  setSelectedImages={
                    data.question === '오늘의 날씨'
                      ? setSelectedWeatherImages
                      : setSelectedEmotionImages
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
    </>
  );
}
