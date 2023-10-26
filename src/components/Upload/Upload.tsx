import React, { useState, useRef } from 'react';
import Accordion from '../Accordion/Accordion';
import KakaoMap from '../Map/KakaoMap';
import Preview from '../FileUpload/Preview';
import {
  Overlay,
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

import Location from '../../asset/icon/Arrow.svg';
import BackIcon from '../../asset/icon/ArrowBack.svg';
import Close from '../../asset/icon/X-White.svg';

const accordionData = [
  {
    question: '앨범 선택',
    answer: '',
  },
  {
    question: '오늘의 날씨',
    answer:
      '/src/asset/image/Sunny.svg, /src/asset/image/PartlySunny.svg, /src/asset/image/Cloudy.svg, /src/asset/image/Rainy.svg, /src/asset/image/Snowy.svg',
  },
  {
    question: '오늘의 기분',
    answer:
      '/src/asset/image/Excited.svg, /src/asset/image/Smiling.svg, /src/asset/image/Yummy.svg, /src/asset/image/Frowning.svg, /src/asset/image/Sad.svg, /src/asset/image/Angry.svg',
  },
];

function Upload({ setOpenPopup }: { setOpenPopup: (open: boolean) => void }) {
  const [kakaoMapVisible, setKakaoMapVisible] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [isIconRotated, setIsIconRotated] = useState(false);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  const toggleKakaoMap = () => {
    setKakaoMapVisible(!kakaoMapVisible);
    setIsIconRotated(!isIconRotated);
  };

  const handleOverlayClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (e.target === overlayRef.current) {
      closeUploadModal();
    }
  };

  const closeUploadModal = () => {
    setOpenPopup(false);
  };

  const handleAddressSelect = (address: string) => {
    setSelectedAddress(address);
  };

  return (
    <>
      <Overlay ref={overlayRef} onClick={handleOverlayClick} />
      <UploadWrapper>
        <UploadHeader>
          <BackButton onClick={() => closeUploadModal()}>
            <img src={BackIcon} alt="뒤로가기버튼" />
          </BackButton>
          <h1>새 게시물</h1>
          <button type="submit">업로드</button>
        </UploadHeader>
        <UploadContents>
          <PicPart>
            <Preview />
          </PicPart>
          <SelectPart>
            <div className="inputWrapper">
              <input type="text" placeholder="제목을 입력해주세요" />
            </div>
            <form className="uploadInfo">
              <textarea
                id="uploadText"
                maxLength={1000}
                cols={30}
                rows={10}
                placeholder="문구를 입력해주세요..."
              ></textarea>
            </form>
            <LocationContents onClick={toggleKakaoMap}>
              <div className="locationHead">
                <h2>{selectedAddress || '위치 추가'}</h2>
                <img
                  src={Location}
                  alt="토글 아이콘"
                  className={isIconRotated ? 'toggle-icon' : ''}
                />
              </div>
            </LocationContents>
            {kakaoMapVisible && (
              <KakaoMapContainer>
                <KakaoMap
                  onAddressSelect={(address: string) =>
                    setSelectedAddress(address)
                  }
                />
              </KakaoMapContainer>
            )}
            <AccordionContents>
              {accordionData.map((data, index) => (
                <Accordion
                  key={index}
                  question={data.question}
                  answer={data.answer}
                />
              ))}
            </AccordionContents>
          </SelectPart>
        </UploadContents>
      </UploadWrapper>
      <CloseBtn onClick={() => closeUploadModal()}>
        <img src={Close} alt="닫기버튼" />
      </CloseBtn>
    </>
  );
}

export default Upload;
