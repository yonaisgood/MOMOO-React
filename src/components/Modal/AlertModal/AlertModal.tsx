import StyledAlertModal from './StyledAlertModal';
import ModalOverlay from '../../CommonStyled/StyledModalOverlay';
import { useRef } from 'react';

export default function AlertModal({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>();

  return (
    <ModalOverlay>
      <StyledAlertModal
        ref={(node) => {
          if (node && !dialogRef.current) {
            dialogRef.current = node;
            node.showModal();
          }
        }}
        aria-labelledby="dialog-label"
      >
        <p id="dialog-label">{message}</p>
        <button type="button" onClick={onClose}>
          확인
        </button>
      </StyledAlertModal>
    </ModalOverlay>
  );
}
