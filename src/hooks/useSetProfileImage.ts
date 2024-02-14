import { useState } from 'react';

export default function useSetProfileImage() {
  const [file, setFile] = useState<File | null>(null);
  const [src, setSrc] = useState('');
  const [error, setError] = useState('');

  const setProfileImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    const file = e.target.files[0];

    if (!/^image\/(jpg|png|jpeg|bmp|tif|heic)$/.test(file.type)) {
      setError(
        '이미지 파일 확장자는 jpg, png, jpeg, bmp, tif, heic만 가능합니다.',
      );
      return;
    }

    if (file.size > 1 * 1024 * 1024) {
      setError('이미지 용량은 10MB 이내로 등록 가능합니다.');
      return;
    }

    const reader = new FileReader();

    reader.readAsDataURL(file);
    setFile(file);

    reader.addEventListener('load', ({ target }) => {
      if (typeof target?.result !== 'string') {
        return;
      }

      const image = new Image();
      image.src = target.result;
      setSrc(target.result);
    });
  };

  return { setProfileImage, file, setFile, src, setSrc, error };
}
