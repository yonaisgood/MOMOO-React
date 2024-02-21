import { SetStateAction } from 'react';

const handleEscKey = (
  e: KeyboardEvent,
  setIsOpenDialog: React.Dispatch<SetStateAction<boolean>>,
) => {
  return window.addEventListener('keydown', () => {
    if (e.keyCode === 27) {
      setIsOpenDialog(false);
    }
  });
};

export { handleEscKey };
