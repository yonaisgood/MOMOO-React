import useEscDialog from '../../../hooks/dialog/useEscDialog';
import useShowModal from '../../../hooks/dialog/useShowModal';

import { StyledDialog, Header } from './StyledMoreModal';

import { closeDialogOnClick } from '../../../utils/dialog';

import Close from '../../../asset/icon/X-Small.svg';

interface btn {
  name: string;
  clickEventListener: () => void;
}

interface Props {
  title: string;
  closeModal: () => void;
  btnList: btn[];
}

export default function MoreModal({ title, closeModal, btnList }: Props) {
  const { showModal } = useShowModal();
  useEscDialog(closeModal);

  return (
    <StyledDialog
      aria-labelledby="modal-select"
      ref={showModal}
      onClick={(e) => closeDialogOnClick(e, closeModal)}
    >
      <div className="modal-content" role="document">
        <Header className="modal-header" id="modal-select">
          <strong>{title}</strong>
        </Header>
        <ul className="modal-list">
          {btnList.map((v, i) => (
            <li key={i}>
              <button type="button" onClick={v.clickEventListener}>
                {v.name}
              </button>
            </li>
          ))}
        </ul>
        <button type="button" className="close-button" onClick={closeModal}>
          <img src={Close} alt="모달 닫기 버튼" />
        </button>
      </div>
    </StyledDialog>
  );
}
