import { SyntheticEvent, useState, useEffect } from 'react';
import { appFireStore, Timestamp } from '../../firebase/config';
import { doc, setDoc } from 'firebase/firestore';
import * as Styled from './UploadStyle';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import uploadImageToStorage from './UploadImageToStorage';
import useAuthContext from '../../hooks/useAuthContext';
import KakaoMap from '../../components/Map/KakaoMap';
import Preview from '../../components/FileUpload/Preview';
import Arrow from '../../asset/icon/Arrow.svg';
import CloseIcon from '../../asset/icon/X-White.svg';
import CloseMobileIcon from '../../asset/icon/X-Small.svg';
import Accordion from '../../components/Accordion/Accordion';
import GetAccordionData from './accordionData';
import MultipleAccordion from '../Accordion/MultipleAccordion';
import StyledOverlay from './StyledOverlay';
import useUploadContext from '../../hooks/useUploadContext';
import { useaddFeedIdFromFeedList } from '../../hooks/useUpdateFeedList';

function Upload() {
  const { user } = useAuthContext();
  const { albumNameListToAdd, setIsUploadModalOpen, setAlbumNameListToAdd } =
    useUploadContext();

  const [kakaoMapVisible, setKakaoMapVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [selectedAddress, setSelectedAddress] = useState('');
  const [selectedWeatherImage, setSelectedWeatherImage] = useState<string>('');
  const [selectedEmotionImage, setSelectedEmotionImage] = useState<string>('');
  const [selectedAlbum, setSelectedAlbum] =
    useState<string[]>(albumNameListToAdd);
  const [file, setFile] = useState<FileList | null>(null);
  const [clientWitch, setClientWitch] = useState(
    document.documentElement.clientWidth,
  );

  const getAccordionData = GetAccordionData();
  const addFeedIdFromFeedList = useaddFeedIdFromFeedList();

  useEffect(() => {
    window.addEventListener('resize', () => {
      setClientWitch(document.documentElement.clientWidth);
    });
  }, []);

  interface Object {
    question: string;
    answer: string[];
  }
  interface AlbumIdData {
    albumName: string;
    docId: string;
  }

  const [accordionData, setAccordionData] = useState<Object[]>([]);
  const [albumIdData, setAlbumIdData] = useState<AlbumIdData[]>([]);

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

  const toggleKakaoMap = () => {
    setKakaoMapVisible(!kakaoMapVisible);
  };

  const closeUploadModal = () => {
    // context 초기화
    setIsUploadModalOpen(false);
    setAlbumNameListToAdd(albumNameListToAdd.slice(0, 1));
  };

  const handleAddressSelect = (selectedAddress: string) => {
    setSelectedAddress(selectedAddress);
  };

  const navigate = useNavigate();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (title.trim() === '') {
      alert('제목을 입력해 주세요');
      return;
    }

    try {
      if (user) {
        // 사용자 UID를 기반으로 Firestore 문서 경로를 생성
        const id = uuidv4();
        const userDocRef = doc(appFireStore, user.uid, user.uid, 'feed', id);

        if (file === null) {
          alert('사진을 선택해주세요');
          return;
        }

        const downloadURLs = await uploadImageToStorage(
          file,
          `feed/${user.uid}`,
        );

        // 업로드할 내용을 객체로 만들기
        const uploadData = {
          title: title,
          text: text,
          timestamp: Timestamp.now(),
          selectedAddress: selectedAddress,
          weatherImage: selectedWeatherImage,
          emotionImage: selectedEmotionImage,
          album: selectedAlbum,
          imageUrl: downloadURLs,
          id: id,
        };

        // Firestore에 업로드 데이터를 추가합니다.
        await setDoc(userDocRef, uploadData);
        navigate(`/feed/${id}`);
        closeUploadModal();

        try {
          selectedAlbum.forEach(async (album) => {
            let selectedAlbumId = '';
            for (const iterator of albumIdData) {
              if (album === iterator.albumName) {
                selectedAlbumId = iterator.docId;
              }
            }

            await addFeedIdFromFeedList(id, selectedAlbumId);
          });
        } catch (error) {
          console.error(
            '앨범 데이터를 업데이트하는 중 오류가 발생했습니다.',
            error,
          );
        }
      } else {
        console.error('사용자가 로그인되지 않았습니다.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <StyledOverlay>
      <Styled.UploadWrapper>
        <Styled.UploadHeader>
          {clientWitch <= 430 && (
            <Styled.MobileCloseBtn onClick={closeUploadModal}>
              <img src={CloseMobileIcon} alt="닫기" />
            </Styled.MobileCloseBtn>
          )}
          <h1>새 게시물</h1>
          <button className="uploadBtn" type="button" onClick={handleSubmit}>
            업로드
          </button>
        </Styled.UploadHeader>
        <Styled.UploadContents>
          <Styled.PicPart>
            <Preview setFile={setFile} />
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
              {accordionData.slice(1, 2).map(() => (
                <MultipleAccordion
                  key={0}
                  question={accordionData[0].question}
                  answer={accordionData[0].answer.join(',')}
                  selectedAlbum={selectedAlbum}
                  setSelectedAlbum={setSelectedAlbum}
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
      <Styled.CloseBtn className="closeBtn" onClick={() => closeUploadModal()}>
        <img src={CloseIcon} alt="닫기버튼" />
      </Styled.CloseBtn>
    </StyledOverlay>
  );
}

Upload.defaultProps = {
  id: '',
  album: '',
};

export default Upload;
