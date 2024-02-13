import { useEffect } from 'react';

import useDeleteId from '../../hooks/useDeleteId';

import ConfirmModal from '../../components/Modal/ConfirmModal/ConfirmModal';
import LoadingModal from '../../components/Modal/Loading/Loading';

export default function DeleteIdModal({ onClose }: { onClose: () => void }) {
  const { deleteId, error, isPending } = useDeleteId();

  useEffect(() => {
    if (error) {
      alert('회원 탈퇴에 실패했습니다');
    }
  }, [error]);

  return (
    <>
      {!isPending && (
        <ConfirmModal
          onClose={onClose}
          handleAgreeBtn={() => {
            (async () => {
              await deleteId();
            })();
          }}
          title="모무를 떠나시겠습니까?"
          btnNameList={['아니요', '예']}
        />
      )}
      {isPending && <LoadingModal text="계정 삭제 중" />}
    </>
  );
}
