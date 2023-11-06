import { useState } from 'react';
import styled from 'styled-components';
import ImgUpload from '../../asset/icon/ImgUpload.svg';
import ArrowLeft from '../../asset/icon/ArrowLeft.svg';
import ArrowRight from '../../asset/icon/ArrowRight.svg';

interface IndicatorProps {
  active: boolean;
}
//
const Preview = () => {
  const [imageList, setImageList] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      if (imageList.length + files.length <= 3) {
        const newImages = Array.from(files).map((file) =>
          URL.createObjectURL(file),
        );
        setImageList([...imageList, ...newImages]);
      } else {
        alert('최대 3장의 이미지까지만 선택할 수 있습니다.');
      }
    }
  };

  // 슬라이드 인디케이터 관련
  const nextSlide = () => {
    setCurrentIndex((currentIndex + 1) % imageList.length);
  };

  const prevSlide = () => {
    setCurrentIndex((currentIndex - 1 + imageList.length) % imageList.length);
  };

  const handleIndicatorClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <>
      <PrivewSection>
        <label htmlFor="file">
          <div className="btnUpload">
            <img src={ImgUpload} alt="사진 업로드 버튼" />
          </div>
        </label>
        <input
          accept="image/*"
          multiple
          type="file"
          id="file"
          onChange={(e) => onUpload(e)}
        />
        <PreviewSlider>
          {imageList.length > 0 && (
            <>
              {/* 모바일 슬라이드 */}
              <ImageGrid>
                {imageList.map((image, index) => (
                  <img key={index} src={image} alt="이미지" />
                ))}
              </ImageGrid>
              {/* 모바일 이상 슬라이드 */}
              <ImgSlidePcSize>
                {imageList.length > 1 && (
                  <button onClick={prevSlide}>
                    <img
                      className="ArrowBack"
                      src={ArrowLeft}
                      alt="뒤로가기 버튼"
                    />
                  </button>
                )}
                <img
                  className="selectImg"
                  src={imageList[currentIndex]}
                  alt="이미지"
                />
                {imageList.length > 1 && (
                  <button onClick={nextSlide}>
                    <img
                      className="ArrowRight"
                      src={ArrowRight}
                      alt="앞으로가기 버튼"
                    />
                  </button>
                )}
              </ImgSlidePcSize>
            </>
          )}
        </PreviewSlider>
        <IndecatorBasicBox>
          {imageList.length > 1 && (
            <IndicatorContainer>
              {imageList.map((_, index) => (
                <Indicator
                  key={index}
                  active={index === currentIndex}
                  onClick={() => handleIndicatorClick(index)}
                />
              ))}
            </IndicatorContainer>
          )}
        </IndecatorBasicBox>
      </PrivewSection>
    </>
  );
};

const ImgSlidePcSize = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 430px) {
    display: none;
  }
`;

const ImageGrid = styled.div`
  display: none;
  width: 100%;
  height: 11.2rem;
  gap: 1rem;
  overflow-x: scroll;
  &::webkit-scrollbar-thumb {
    background-color: none;
  }
  &::-webkit-scrollbar-thumb {
    background-color: none;
  }

  img {
    width: 100%;
    height: auto;
    object-fit: contain;
  }

  @media (max-width: 430px) {
    display: flex;

    img {
      width: 11.2rem;
      aspect-ratio: 1/1;
      background-color: var(--gray-900);
    }
  }
`;

const PrivewSection = styled.section`
  width: 100%;
  aspect-ratio: 1/1;
  position: relative;

  .btnUpload {
    width: 3.4rem;
    height: 3.4rem;
    position: absolute;
    bottom: 5.4rem;
    right: 2.4rem;
    cursor: pointer;
  }

  #file {
    display: none;
  }

  .selectImg {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media (max-width: 1024px) {
    .btnUpload {
      width: 3rem;
      height: 3rem;
    }
  }

  @media (max-width: 430px) {
    visibility: visible;
    width: 100%;
    height: 11.2rem;
    display: flex;
    flex-direction: row;

    .btnUpload {
      left: 0;
      bottom: 0;
    }
  }
`;

const PreviewSlider = styled.div`
  width: 100%;
  height: calc(100% - 3rem);
  margin: 0 auto;

  .ArrowBack {
    width: 2rem;
    height: 2rem;
    position: absolute;
    top: 50%;
    left: 2rem;
    background-color: rgba(3, 3, 3, 0.2);
  }

  .ArrowRight {
    width: 2rem;
    height: 2rem;
    position: absolute;
    top: 50%;
    right: 2rem;
    background-color: rgba(3, 3, 3, 0.2);
  }

  @media (max-width: 430px) {
    height: calc(100% - 0rem);
  }
`;

const IndecatorBasicBox = styled.div`
  width: 100%;
  height: 3rem;
  background-color: var(--background-color);

  @media (max-width: 430px) {
    display: none;
  }
`;

const IndicatorContainer = styled.div`
  width: 100%;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;

  @media (max-width: 430px) {
    display: none;
  }
`;

const Indicator = styled.div<IndicatorProps>`
  width: 0.7rem;
  height: 0.7rem;
  border-radius: 50%;
  background-color: ${(props) => (props.active ? '#121212' : '#A9D3D9')};
  cursor: pointer;
  display: flex;
  gap: 2rem;
  margin-right: 0.5rem;
`;

export default Preview;
