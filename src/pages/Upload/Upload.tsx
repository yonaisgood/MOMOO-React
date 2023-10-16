import React from 'react';
import Accordion from '../../components/Accordion/Accordion';
import {
  UploadWrapper,
  UploadHeader,
  UploadContents,
  PicPart,
  SelectPart,
  LocationContents,
  AccordionContents,
} from './UploadStyle';

//image
import Location from '../../asset/icon/Location.svg';

const accordionData = [
  {
    question: '앨범선택',
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

function Upload() {
  return (
    <UploadWrapper>
      <UploadHeader>
        <h1>새 게시물</h1>
        <button type='submit'>업로드</button>
      </UploadHeader>
      <UploadContents>
        <PicPart></PicPart>
        <SelectPart>
          <div className='inputWrapper'>
            <input type='text' placeholder='제목을 입력해주세요' />
          </div>
          <form className='uploadInfo'>
            <textarea
              id='uploadText'
              maxLength={1000}
              cols={30}
              rows={10}
              placeholder='문구를 입력해주세요...'
            ></textarea>
          </form>
          <LocationContents>
            <h2>위치</h2>
            <img src={Location} alt='위치아이콘' />
          </LocationContents>
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
  );
}

export default Upload;
