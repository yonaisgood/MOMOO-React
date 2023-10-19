import { useState } from 'react';
import styled from 'styled-components';
import ImgUpload from '../../asset/icon/ImgUpload.svg';
import ArrowLeft from '../../asset/icon/ArrowLeft.svg';
import ArrowRight from '../../asset/icon/ArrowRight.svg';

interface IndicatorProps {
  active: boolean;
}

const Preview = () => {
  const [imageList, setImageList] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0); // 현재 슬라이드 인덱스

  const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file),
      );
      setImageList([...imageList, ...newImages]);
    }
  };

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
              <img
                className="ArrowBack"
                src={ArrowLeft}
                alt="뒤로가기 버튼"
                onClick={prevSlide}
              />

              <img
                className="selectImg"
                src={imageList[currentIndex]}
                alt="이미지"
              />
              <button onClick={nextSlide}>
                <img
                  className="ArrowRight"
                  src={ArrowRight}
                  alt="앞으로가기 버튼"
                />
              </button>
            </>
          )}
        </PreviewSlider>
        <IndicatorContainer>
          {imageList.map((_, index) => (
            <Indicator
              key={index}
              active={index === currentIndex}
              onClick={() => handleIndicatorClick(index)}
            />
          ))}
        </IndicatorContainer>
      </PrivewSection>
    </>
  );
};

const PrivewSection = styled.section`
  width: 100%;
  height: 100%;
  position: relative;

  .btnUpload {
    width: 3.4rem;
    aspect-ratio: 1/1;
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
`;

const PreviewSlider = styled.div`
  width: 100%;
  height: calc(100% - 3rem);
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;

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
`;

const IndicatorContainer = styled.div`
  width: 100%;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  background-color: var(--background-color);
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
