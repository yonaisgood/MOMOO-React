import { SetStateAction, Dispatch } from 'react';

export default async function useFileInp(
  e: React.ChangeEvent<HTMLInputElement>,
  setFile: Dispatch<SetStateAction<File | null>>,
  setSrc: Dispatch<SetStateAction<string>>
) {
  if (!e.target.files) {
    return;
  }

  const file = e.target.files[0];

  if (!/^image\/(jpg|png|jpeg|bmp|tif|heic)$/.test(file.type)) {
    alert('이미지 파일 확장자는 jpg, png, jpeg, bmp, tif, heic만 가능합니다.');
    return;
  }

  if (file.size > 2 * 1024 * 1024) {
    alert('이미지 용량은 2MB 이내로 등록 가능합니다.');
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
}
