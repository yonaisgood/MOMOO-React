import { SyntheticEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import useAuthContext from '../../hooks/useAuthContext';
import useEditContext from '../../hooks/useEditContext';
import useGetFeedData from '../../hooks/useGetFeedData';
import useEditFeed from '../../hooks/useEditFeed';
import useGetSavedAlbumList from '../../hooks/useGetSavedAlbumList';
import {
  useAddFeedIdFromFeedList,
  useRemoveFeedIdFromFeedList,
} from '../../hooks/useUpdateFeedList';

import KakaoMap from '../Map/KakaoMap';
import Preview from '../FileUpload/Preview';
import Accordion from '../Accordion/Accordion';
import MultipleAccordion from '../Accordion/MultipleAccordion';
import * as Styled from './Upload/StyledUpload';
import StyledOverlay from './StyledOverlay';

import { deleteImg } from '../../SDKUtiles';
import GetAccordionData from './GetAccordionData';
import uploadImageToStorage from './UploadImageToStorage';

import Arrow from '../../asset/icon/Arrow.svg';
import CloseMobileIcon from '../../asset/icon/X-Small.svg';
import CloseIcon from '../../asset/icon/X-White.svg';
import LoadingIcon from '../../asset/icon/Loading.svg';
import StyledLoadingImg from '../CommonStyled/StyledLodingImg';

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
  const [isPending, setIsPending] = useState(false);

  const { user } = useAuthContext();
  const { setIsEditModalOpen, feedIdToEdit, setFeedIdToEdit } =
    useEditContext();
  const navigate = useNavigate();

  const getAccordionData = GetAccordionData();
  const editFeed = useEditFeed();
  const getSavedAlbumList = useGetSavedAlbumList();
  const addFeedIdFromFeedList = useAddFeedIdFromFeedList();
  const removeFeedIdFromFeedList = useRemoveFeedIdFromFeedList();

  useEffect(() => {
    window.addEventListener('resize', () => {
      setClientWitch(document.documentElement.clientWidth);
    });

    const setFeedData = async () => {
      const data = await getFeedData(feedIdToEdit);

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
      const data = await getSavedAlbumList(feedIdToEdit);

      if (data) {
        setSelectedAlbumList(data.map((v) => v.data().name));
        setSavedAlbumList(data.map((v) => v.id));
      }
    };

    const SetAccordionData = async () => {
      if (user) {
        const result = await getAccordionData();
        setAccordionData(result.accordionData);
        setAlbumIdData(result.albumIdData);
      }
    };

    setFeedData();
    setSavedAlbumData();
    SetAccordionData();
  }, []);

  if (!user) {
    navigate('/');
    return;
  }

  const toggleKakaoMap = () => {
    setKakaoMapVisible(!kakaoMapVisible);
  };

  const closeEditFeedModal = () => {
    setIsEditModalOpen(false);
    setFeedIdToEdit('');
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
      setIsPending(true);

      let downloadURLs: string[] = imgUrlList;

      if (file !== null) {
        downloadURLs = await uploadImageToStorage(
          file,
          `feed/${user.uid}`,
          feedIdToEdit,
        );
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

      // update feedList
      selectedAlbumList.forEach(async (selectedAlbumName) => {
        let selectedAlbumId = '';

        for (const iterator of albumIdData) {
          if (selectedAlbumName === iterator.albumName) {
            selectedAlbumId = iterator.docId;
          }
        }

        if (!savedAlbumList.includes(selectedAlbumId)) {
          await addFeedIdFromFeedList(feedIdToEdit, selectedAlbumId);
        }
      });

      savedAlbumList.forEach(async (savedAlbumId) => {
        let savedAlbumName = '';

        for (const iterator of albumIdData) {
          if (savedAlbumId === iterator.docId) {
            savedAlbumName = iterator.albumName;
          }
        }

        if (!selectedAlbumList.includes(savedAlbumName)) {
          await removeFeedIdFromFeedList(feedIdToEdit, savedAlbumId);
        }
      });

      // 이미지 삭제 실패 시, 게시물 수정이 중단되지 않도록 try 마지막에 위치
      if (file !== null) {
        imgUrlList.forEach(async (url) => await deleteImg(url));
      }
    } catch (error) {
      console.error(error);
    }

    setIsPending(false);
    navigate(`/feed/${feedIdToEdit}`);
    closeEditFeedModal();
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
          <h2>게시물 수정</h2>
          <button className="uploadBtn" type="submit" onClick={handleSubmit}>
            완료
          </button>
        </Styled.UploadHeader>
        <Styled.UploadContents>
          {isPending ? (
            <StyledLoadingImg src={LoadingIcon} alt="로딩중" />
          ) : (
            <>
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
                      onAddressSelect={(address) =>
                        handleAddressSelect(address)
                      }
                    />
                  </Styled.KakaoMapContainer>
                )}
                <Styled.AccordionContents>
                  {accordionData.slice(1, 2).map(() => (
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
            </>
          )}
        </Styled.UploadContents>
      </Styled.UploadWrapper>
      <Styled.CloseBtn className="closeBtn" onClick={closeEditFeedModal}>
        <img src={CloseIcon} alt="닫기버튼" />
      </Styled.CloseBtn>
    </StyledOverlay>
  );
}
