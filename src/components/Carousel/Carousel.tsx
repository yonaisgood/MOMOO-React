import { useRef, useState } from 'react';

import * as Styled from './StyledCarousel';

import ArrowWhite from '../../asset/icon/Arrow-White.svg';

const Carousel = ({ imgUrlList }: { imgUrlList: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideRef = useRef<HTMLUListElement | null>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent<HTMLUListElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLUListElement>) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      nextSlide();
    } else if (touchStartX.current - touchEndX.current < -50) {
      prevSlide();
    }
  };

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
        <ul
          ref={slideRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {imgUrlList.map((image, index) => (
            <li key={index}>
              <img src={image} alt="이미지" />
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
