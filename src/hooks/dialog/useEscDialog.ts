import { SetStateAction, useEffect } from 'react';

export default function useEsDialog(
  setIsOpenDialog: React.Dispatch<SetStateAction<boolean>>,
) {
  useEffect(() => {
    const escDialog = (e: KeyboardEvent) => {
      if (e.keyCode === 27) {
        setIsOpenDialog(false);
      }
    };

    window.addEventListener('keydown', escDialog);
  }, []);
}
