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

  return (
    <AccordionWrapper>
      <div id='Accordion_wrap'>
        <div className='que' onClick={handleQuestionClick}>
          <span>{question}</span>
          <div className='arrow-wrap'>
            <span className={isAccordionOpen ? 'arrow-top' : 'arrow-bottom'}>
              <img
                className='directionIcon'
                src={Direction}
                alt='Arrow Direction'
              />
            </span>
          </div>
        </div>
        {isAccordionOpen && (
          <div className='anw'>
            {answer.split(',').map((imagePath, index) => (
              <img key={index} src={imagePath.trim()} alt={`이미지 ${index}`} />
            ))}
          </div>
        )}
      </div>
    </AccordionWrapper>
  );
}

export default Accordion;
