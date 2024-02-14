import { useState, SetStateAction, Dispatch, useEffect } from 'react';

import AlertModal from '../../components/Modal/AlertModal/AlertModal';
import * as Styled from './StyledPreview';

import ImgUpload from '../../asset/icon/ImgUpload.svg';
import ArrowWhite from '../../asset/icon/Arrow-White.svg';

const Preview = ({
  setFile,
  imgUrlList,
}: {
  setFile: Dispatch<SetStateAction<FileList | null>>;
  imgUrlList: string[];
}) => {
  const [imageList, setImageList] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [submitErrMessage, setSubmitErrMessage] = useState('');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      const file = files[0];

      if (!/^image\/(jpg|svg|png|jpeg|bmp|tif|heic)$/.test(file.type)) {
        setSubmitErrMessage(
          '이미지 파일 확장자는 jpg, svg, png, jpeg, bmp, tif, heic만 가능합니다.',
        );
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        setSubmitErrMessage('이미지 용량은 10MB 이내로 등록 가능합니다.');
        return;
      }

      setImages(files);
      setFile(files);
    } else {
      setSubmitErrMessage('이미지 파일을 선택해주세요.');
    }
  };

  useEffect(() => {
    setImageList(imgUrlList);
  }, [imgUrlList]);

  const setImages = async (files: FileList) => {
    if (files) {
      if (files.length <= 3) {
        const fileArray = Array.from(files);
        const newImages: string[] = [];

        for (const file of fileArray) {
          const imageUrl = URL.createObjectURL(file);
          newImages.push(imageUrl);
        }

        setImageList(newImages);
      } else {
        setSubmitErrMessage('최대 3장의 이미지까지만 선택할 수 있습니다.');
      }
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
      <Styled.PreviewSection>
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
          onChange={handleImageUpload}
          onClick={(e) => console.log('file', e.currentTarget.files)}
        />
        <Styled.PreviewSlider>
          {imageList.length > 0 && (
            <>
              {/* 모바일 슬라이드 */}
              <Styled.ImageGrid>
                {imageList.map((image, index) => (
                  <img key={index} src={image} alt="이미지" />
                ))}
              </Styled.ImageGrid>
              {/* 모바일 이상 슬라이드 */}
              <Styled.ImgSlidePcSize>
                {imageList.length > 1 && (
                  <button onClick={prevSlide} className="ArrowBack">
                    <img src={ArrowWhite} alt="뒤로가기 버튼" />
                  </button>
                )}
                <img
                  className="selectImg"
                  src={imageList[currentIndex]}
                  alt="이미지"
                />
                {imageList.length > 1 && (
                  <button
                    type="button"
                    onClick={nextSlide}
                    className="ArrowRight"
                  >
                    <img src={ArrowWhite} alt="앞으로가기 버튼" />
                  </button>
                )}
              </Styled.ImgSlidePcSize>
            </>
          )}
        </Styled.PreviewSlider>
        <Styled.IndicatorBasicBox>
          {imageList.length > 1 && (
            <Styled.IndicatorContainer>
              {imageList.map((_, index) => (
                <Styled.Indicator
                  key={index}
                  active={index === currentIndex}
                  onClick={() => handleIndicatorClick(index)}
                />
              ))}
            </Styled.IndicatorContainer>
          )}
        </Styled.IndicatorBasicBox>
      </Styled.PreviewSection>

      {submitErrMessage && (
        <AlertModal
          title={submitErrMessage}
          onClose={() => setSubmitErrMessage('')}
        />
      )}
    </>
  );
};

Preview.defaultProps = {
  imgUrlList: [],
};

export default Preview;
