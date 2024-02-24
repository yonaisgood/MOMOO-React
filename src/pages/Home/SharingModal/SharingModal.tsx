import useEscDialog from '../../../hooks/dialog/useEscDialog';
import useShowModal from '../../../hooks/dialog/useShowModal';

import { StyledSharingModal, DialogTitle } from './StyledSharingModal';

import { closeDialogOnClick } from '../../../utils/dialog';

import Close from '../../../asset/icon/X-Small.svg';

interface Props {
  closeModal: () => void;
}

export default function SharingModal({ closeModal }: Props) {
  const { showModal } = useShowModal();
  useEscDialog(closeModal);

  return (
    <StyledSharingModal
      aria-labelledby="modal"
      onClick={(e) => closeDialogOnClick(e, closeModal)}
      ref={showModal}
    >
      <div>
        <DialogTitle>공유</DialogTitle>
        <div>
          <label htmlFor="sharing" className="a11y-hidden">
            공유 링크
          </label>
          <input id="sharing" type="url" value="https://momoo.kr" />
          <button type="button" className="copy-btn">
            복사
          </button>
        </div>
        <strong className="manage">게스트 관리</strong>
        <ul>
          <li>
            <img src={Close} alt="프로필 사진" />
            <div>
              <span className="ellipsis">애벌레가 먹은 사과는 맛있었다</span>
              <span className="ellipsis">appleappleappleapple@naver.com</span>
            </div>
            <button type="button">삭제</button>
          </li>
          <li>
            <img src={Close} alt="프로필 사진" />
            <div>
              <span className="ellipsis">김사과</span>
              <span className="ellipsis">apple@naver.com</span>
            </div>
            <button type="button">삭제</button>
          </li>
        </ul>
        <button type="button" className="close-button" onClick={closeModal}>
          <img src={Close} alt="모달 닫기 버튼" />
        </button>
      </div>
    </StyledSharingModal>
  );
}
