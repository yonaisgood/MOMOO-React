import { useEffect } from 'react';

import useDeleteId from '../../hooks/useDeleteId';

import AlertModal from '../../components/Modal/AlertModal/AlertModal';

export default function DeleteIdModal({ onClose }: { onClose: () => void }) {
  const { deleteId, error } = useDeleteId();

  useEffect(() => {
    if (error) {
      alert('회원 탈퇴에 실패했습니다');
    }
  }, [error]);

  return (
    <AlertModal
      onClose={onClose}
      handleAgreeBtn={() => {
        (async () => {
          await deleteId();
        })();
      }}
      title="모무를 떠나시겠습니까?"
      btnNameList={['아니요', '예']}
    />
  );
}
