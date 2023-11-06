import { SyntheticEvent, useState } from 'react';
import { appFireStore, Timestamp } from '../../firebase/config';
import { updateDoc, arrayUnion, doc } from 'firebase/firestore';
import uploadImageToStorage from './UploadImageToStorage';
import useAuthContext from '../../hooks/useAuthContext';
import Accordion from '../../components/Accordion/Accordion';
import KakaoMap from '../../components/Map/KakaoMap';
import Preview from '../../components/FileUpload/Preview';
import Arrow from '../../asset/icon/Arrow.svg';
import BackIcon from '../../asset/icon/ArrowBack.svg';
import CloseIcon from '../../asset/icon/X-White.svg';
import {
  UploadWrapper,
  BackButton,
  UploadHeader,
  UploadContents,
  PicPart,
  SelectPart,
  LocationContents, 
  KakaoMapContainer,
  AccordionContents,
  CloseBtn,
} from './UploadStyle';

const accordionData = [
  {
    question: '앨범 선택',
    answer: [],
  },
  {
    question: '오늘의 날씨',
    answer: [
      '/src/asset/image/Sunny.svg',
      '/src/asset/image/PartlySunny.svg',
      '/src/asset/image/Cloudy.svg',
      '/src/asset/image/Rainy.svg',
      '/src/asset/image/Snowy.svg',
    ],
  },
  {
    question: '오늘의 기분',
    answer: [
      '/src/asset/image/Excited.svg',
      '/src/asset/image/Smiling.svg',
      '/src/asset/image/Yummy.svg',
      '/src/asset/image/Frowning.svg',
      '/src/asset/image/Sad.svg',
      '/src/asset/image/Angry.svg',
    ],
  },
];

interface Props {
  setOpenPopup: React.Dispatch<React.SetStateAction<boolean>>;
  id?: string;
  album?: string;
}

// id가 빈문자열이 아니면, 해당 id를 가진 피드 수정(혹은 id 포함 피드 데이터를 아큐먼트로 받아도 좋을 듯)
// album이 빈문자열이 아니면, 해당 album이 선택되어 있도록 렌더링
function Upload({ setOpenPopup, id, album }: Props) {
  const [kakaoMapVisible, setKakaoMapVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [selectedAddress, setSelectedAddress] = useState('');
  const [selectedWeatherImages, setSelectedWeatherImages] =
    useState<string>('');
  const [selectedEmotionImages, setSelectedEmotionImages] =
    useState<string>('');
    const [file, setFile] = useState<File | null>(null);
    
    const { user } = useAuthContext();

  const toggleKakaoMap = () => {
    setKakaoMapVisible(!kakaoMapVisible);
  };

  const handleGoBack = () => {
    window.history.back();
  };

  const closeUploadModal = () => {
    setOpenPopup(false);
  };

  const handleAddressSelect = (selectedAddress: string) => {
    setSelectedAddress(selectedAddress);
    console.log('Selected address:', selectedAddress);
  };

  const handleImageUpload = (imageFile: File | null) => {
    if (imageFile) {
      setFile(imageFile);
    } else {
      alert('이미지 파일을 선택해주세요.');
    }
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (title.trim() === '') {
      alert('제목을 입력해 주세요');
      return;
    }
    try {
      if (user) {
        // 사용자 UID를 기반으로 Firestore 문서 경로를 생성
        const userDocRef = doc(appFireStore, user.uid, 'feed');

        if(file === null) {
          return;
        }

        const downloadURL = await uploadImageToStorage(file, 'feed');

        // 업로드할 내용을 객체로 만들기
        const uploadData = {
          title: title,
          text: text,
          timestamp: Timestamp.now(),
          selectedAddress: selectedAddress,
          weatherImages: selectedWeatherImages,
          emotionImages: selectedEmotionImages,
          imageUrl: downloadURL,
        };

        // Firestore에 업로드 데이터를 추가합니다.
        await updateDoc(userDocRef, {
          feedList: arrayUnion(uploadData),
        });
      } else {
        console.error('사용자가 로그인되지 않았습니다.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <UploadWrapper>
        <UploadHeader>
          <BackButton onClick={() => handleGoBack()}>
            <img src={BackIcon} alt="뒤로가기버튼" />
          </BackButton>
          <h1>새 게시물</h1>
          <button type="submit" onClick={handleSubmit}>
            업로드
          </button>
        </UploadHeader>
        <UploadContents>
          <PicPart>
            <Preview onImageUpload={handleImageUpload} />
          </PicPart>
          <SelectPart>
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
            <LocationContents onClick={toggleKakaoMap}>
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
            </LocationContents>

            {kakaoMapVisible && (
              <KakaoMapContainer>
                <KakaoMap
                  onAddressSelect={(address) => handleAddressSelect(address)}
                />
              </KakaoMapContainer>
            )}
            <AccordionContents>
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
            </AccordionContents>
          </SelectPart>
        </UploadContents>
      </UploadWrapper>
      <CloseBtn className="closeBtn" onClick={() => closeUploadModal()}>
        <img src={CloseIcon} alt="닫기버튼" />
      </CloseBtn>
    </>
  );
}

Upload.defaultProps = {
  id: '',
  album: '',
};

export default Upload;
