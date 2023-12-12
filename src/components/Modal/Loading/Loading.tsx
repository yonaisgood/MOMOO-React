import { useRef, useEffect } from 'react';

import StyledLoadingModal from './StyledLoadingModal';
import ModalOverlay from '../../CommonStyled/StyledModalOverlay';

import LoadingIcon from '../../../asset/icon/Loading.svg';

export default function LoadingModal({ text }: { text: string }) {
  const modalRef = useRef<null | HTMLDialogElement>(null);

  useEffect(() => {}, []);

  const setModalRef = (node: HTMLDialogElement) => {
    if (!modalRef.current) {
      modalRef.current = node;
      node.showModal();
    }
  };

  return (
    <ModalOverlay>
      <StyledLoadingModal
        role="dialog"
        aria-labelledby="modal-select"
        ref={(node) => {
          if (node) {
            setModalRef(node);
          }
        }}
      >
        {text}
        <img src={LoadingIcon} alt="" />
      </StyledLoadingModal>
    </ModalOverlay>
  );
}
