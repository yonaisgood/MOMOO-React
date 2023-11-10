import { useState } from 'react';
import { AccordionWrapper, MultiAccordionWrapper } from './AccordionStyle';
import Direction from '../../asset/icon/Arrow.svg';

interface AccordionProps {
  question: string;
  answer: string;
  selectedAlbum: string;
  setSelectedAlbum: (album: string) => void;
}

function MultipleAccordion({
  question,
  answer,
  selectedAlbum,
  setSelectedAlbum,
}: AccordionProps) {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const answerArray = answer.split(',');
  const [selectedTexts, setSelectedTexts] = useState<string[]>([
    answerArray[0],
  ]);

  const handleQuestionClick = () => {
    setIsAccordionOpen((prev) => !prev);
  };

  const MultiAnswerClick = (text: string) => {
    // 이미 선택된 텍스트인지 확인
    const isSelected = selectedTexts.includes(text);

    if (text === answerArray[0]) {
      return;
    }

    if (isSelected) {
      const updatedSelection = selectedTexts.filter(
        (selected) => selected !== text,
      );
      setSelectedTexts(updatedSelection);
    } else {
      // 선택되지 않은 텍스트일 경우 선택 상태로 업데이트
      setSelectedTexts([...selectedTexts, text]);
    }
    // 여기에서 selectedAlbum을 업데이트합니다.
    const updatedAlbum = selectedTexts.join(','); // 선택된 텍스트를 쉼표로 연결
    setSelectedAlbum(updatedAlbum);
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
                  key={index}
                  onClick={() => MultiAnswerClick(item.trim())}
                  className={selectedTexts.includes(item) ? 'selected' : ''}
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
