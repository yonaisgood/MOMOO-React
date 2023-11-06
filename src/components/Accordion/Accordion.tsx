import { useState } from 'react';
import AccordionWrapper from './AccordionStyle';
import Direction from '../../asset/icon/Arrow.svg';

interface AccordionProps {
  question: string;
  answer: string;
  selectedImages: string;
  setSelectedImages: (images: string) => void;
}

function Accordion({
  question,
  answer,
  selectedImages,
  setSelectedImages,
}: AccordionProps) {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const answerArray = answer.split(',');

  const handleQuestionClick = () => {
    setIsAccordionOpen((prev) => !prev);
  };

  const handleAnswerClick = (imagePath: string) => {
    // 이미지를 선택한 경우, 선택을 해제하고 아무 이미지도 선택하지 않음
    if (selectedImages.includes(imagePath)) {
      setSelectedImages('');
    } else {
      // 이미지가 선택되지 않은 경우, 선택한 이미지를 업데이트
      setSelectedImages(imagePath);
    }
  };

  return (
    <AccordionWrapper>
      <div id="Accordion_wrap">
        <div className="que" onClick={handleQuestionClick}>
          <span>{question}</span>
          <div className="arrow-wrap">
            <span className={isAccordionOpen ? 'arrow-top' : 'arrow-bottom'}>
              <img
                className="directionIcon"
                src={Direction}
                alt="Arrow Direction"
              />
            </span>
          </div>
        </div>
        {isAccordionOpen && (
          <div className="anw">
            {answerArray.map((imagePath, index) => (
              <button
                key={index}
                onClick={() => handleAnswerClick(imagePath.trim())}
                className={
                  selectedImages.includes(imagePath.trim()) ? 'selected' : ''
                }
              >
                <img
                  className="btnImg"
                  src={imagePath.trim()}
                  alt={`이미지 ${index}`}
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </AccordionWrapper>
  );
}

export default Accordion;
