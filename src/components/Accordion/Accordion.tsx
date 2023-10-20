import React, { useState } from 'react';
import AccordionWrapper from './AccordionStyle';
import Direction from '../../asset/icon/Arrow.svg';

interface AccordionProps {
  question: string;
  answer: string;
}

function Accordion({ question, answer }: AccordionProps) {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const handleQuestionClick = () => {
    setIsAccordionOpen((prev) => !prev);
  };

  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const handleAnswerClick = (imagePath: string) => {
    setSelectedAnswer(imagePath);
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
            {answer.split(',').map((imagePath, index) => (
              <button
                key={index}
                onClick={() => handleAnswerClick(imagePath.trim())}
                className={
                  selectedAnswer === imagePath.trim() ? 'selected' : ''
                }
              >
                <img className='btnImg' src={imagePath.trim()} alt={`이미지 ${index}`} />
              </button>
            ))}
          </div>
        )}
      </div>
    </AccordionWrapper>
  );
}

export default Accordion;
