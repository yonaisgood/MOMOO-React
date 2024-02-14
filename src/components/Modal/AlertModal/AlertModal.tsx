import StyledAlertModal from './StyledAlertModal';
import ModalOverlay from '../../CommonStyled/StyledModalOverlay';
import { useRef } from 'react';

export default function AlertModal({
  title,
  onClose,
}: {
  title: string;
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
        <h3 id="dialog-label">{title}</h3>
        <button type="button" onClick={onClose}>
          확인
        </button>
      </StyledAlertModal>
    </ModalOverlay>
  );
}
