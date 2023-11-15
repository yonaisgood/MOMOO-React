import { useRef, useState } from 'react';
import ArrowWhite from '../../asset/icon/Arrow-White.svg';
import * as Styled from './StyledCarousel';

const Carousel = ({ imgUrlList }: { imgUrlList: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideRef = useRef<HTMLUListElement | null>(null);

  const nextSlide = () => {
    if (!slideRef.current) {
      return;
    }

    if (currentIndex < imgUrlList.length - 1) {
      const indexToSet = (currentIndex + 1) % imgUrlList.length;
      slideRef.current.style.transform = `translateX(-${indexToSet * 100}%)`;
      setCurrentIndex(indexToSet);
    }
  };

  const prevSlide = () => {
    if (!slideRef.current) {
      return;
    }

    if (currentIndex > 0) {
      const indexToSet =
        (currentIndex - 1 + imgUrlList.length) % imgUrlList.length;
      slideRef.current.style.transform = `translateX(-${indexToSet * 100}%)`;
      setCurrentIndex(indexToSet);
    }
  };

  const handleIndicatorClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <>
      <Styled.SlideImgWrap>
        <ul ref={slideRef}>
          {imgUrlList.map((image, index) => (
            <li>
              <img key={index} src={image} alt="이미지" />
            </li>
          ))}
        </ul>

        {imgUrlList.length > 1 && (
          <button type="button" onClick={prevSlide} className="ArrowBack">
            <img src={ArrowWhite} alt="뒤로가기 버튼" />
          </button>
        )}

        {imgUrlList.length > 1 && (
          <button type="button" onClick={nextSlide} className="ArrowRight">
            <img src={ArrowWhite} alt="앞으로가기 버튼" />
          </button>
        )}
      </Styled.SlideImgWrap>

      {imgUrlList.length > 1 && (
        <Styled.IndicatorList>
          {imgUrlList.map((_, index) => (
            <Styled.IndicatorItem key={index} active={index === currentIndex}>
              <button
                type="button"
                onClick={() => handleIndicatorClick(index)}
                aria-label={`${imgUrlList}개 중 ${index + 1}번`}
              ></button>
            </Styled.IndicatorItem>
          ))}
        </Styled.IndicatorList>
      )}
    </>
  );
};

export default Carousel;
