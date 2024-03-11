import { useState, SetStateAction, Dispatch, useEffect } from 'react';

import AlertModal from '../../components/Modal/AlertModal/AlertModal';
import * as Styled from './StyledPreview';

import ImgUpload from '../../asset/icon/Add-L-White.svg';
import DeleteImg from '../../asset/icon/X-Small.svg';

const Preview = ({
  imgUrlList,
}: {
  setFile: Dispatch<SetStateAction<FileList | null>>;
  imgUrlList: string[];
}) => {
  const [imageList, setImageList] = useState<string[]>([]);

  const [submitErrMessage, setSubmitErrMessage] = useState('');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const MAX_IMAGE_SIZE = 10 * 1024 * 1024;

    if (files && files.length > 0) {
      const validFiles = Array.from(files).filter((file) => {
        const isValidType = /^image\/(jpg|svg|png|jpeg|bmp|tif|heic)$/.test(
          file.type,
        );
        const isValidSize = file.size <= MAX_IMAGE_SIZE;

        if (!isValidType || !isValidSize) {
          setSubmitErrMessage(
            !isValidType
              ? '이미지 파일 확장자는 jpg, svg, png, jpeg, bmp, tif, heic만 가능합니다.'
              : '이미지 용량은 10MB 이내로 등록 가능합니다.',
          );
          return false;
        }
        return true;
      });

      const newImages = validFiles.map((file) => URL.createObjectURL(file));

      setImageList((prevImages) => [...prevImages, ...newImages]);
    } else {
      setSubmitErrMessage('이미지 파일을 선택해주세요.');
    }
  };

  useEffect(() => {
    setImageList(imgUrlList);
  }, [imgUrlList]);

  const handleRemoveImage = (indexToRemove: number) => {
    setImageList((currentImgList) =>
      currentImgList.filter((_, index) => index !== indexToRemove),
    );
  };

  return (
    <>
      <Styled.SelectContainer>
        <Styled.ImageGrid>
          {imageList.map((image, index) => (
            <div key={index} className="selectedImgList">
              <img className="seletedImg" src={image} alt="이미지" />
              <button
                className="deleteBtn"
                onClick={() => handleRemoveImage(index)}
              >
                <img
                  className="deleteBtnImg"
                  src={DeleteImg}
                  alt="이미지삭제"
                />
              </button>
            </div>
          ))}
          <Styled.PreviewSection>
            <label htmlFor="file">
              <img
                src={ImgUpload}
                alt="사진 업로드 버튼"
                className="btnUpload"
              />
            </label>
            <input
              accept="image/*"
              multiple
              type="file"
              id="file"
              onChange={handleImageUpload}
              onClick={(e) => console.log('file', e.currentTarget.files)}
            />
          </Styled.PreviewSection>
        </Styled.ImageGrid>

        {submitErrMessage && (
          <AlertModal
            message={submitErrMessage}
            onClose={() => setSubmitErrMessage('')}
          />
        )}
      </Styled.SelectContainer>
    </>
  );
};
Preview.defaultProps = {
  imgUrlList: [],
};

export default Preview;
