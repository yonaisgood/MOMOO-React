import { useState } from 'react';

import { AccordionWrapper, MultiAccordionWrapper } from './StyledAccordion';

import Direction from '../../asset/icon/Arrow.svg';

interface AccordionProps {
  question: string;
  answer: string;
  selectedAlbum: string[];
  setSelectedAlbum: (album: string[]) => void;
}

function MultipleAccordion({
  question,
  answer,
  selectedAlbum,
  setSelectedAlbum,
}: AccordionProps) {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const answerArray = answer.split(',');

  const handleQuestionClick = () => {
    setIsAccordionOpen((prev) => !prev);
  };

  const MultiAnswerClick = (text: string) => {
    const isSelected = selectedAlbum.includes(text);

    if (isSelected) {
      setSelectedAlbum(selectedAlbum.filter((album) => album !== text));
    } else {
      setSelectedAlbum([...selectedAlbum, text]);
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
          <MultiAccordionWrapper>
            <div className="anw" id="multiAnswer">
              {answerArray.map((item, index) => (
                <button
                  type="button"
                  disabled={item === '전체 보기' ? true : false}
                  key={index}
                  onClick={() => MultiAnswerClick(item)}
                  className={selectedAlbum.includes(item) ? 'selected' : ''}
                >
                  {item}
                </button>
              ))}
            </div>
          </MultiAccordionWrapper>
        )}
      </div>
    </AccordionWrapper>
  );
}

export default MultipleAccordion;
