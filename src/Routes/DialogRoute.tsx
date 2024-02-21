import { Outlet } from 'react-router-dom';

import useAuthContext from '../hooks/useAuthContext';
import useEditContext from '../hooks/useEditContext';
import useUploadContext from '../hooks/useUploadContext';

import EditFeedModal from '../components/Upload/EditFeedModal';
import Upload from '../components/Upload/Upload/Upload';

export default function DialogRoute() {
  const { user } = useAuthContext();
  const { isEditModalOpen } = useEditContext();
  const { isUploadModalOpen } = useUploadContext();

  if (!user) {
    return <Outlet />;
  }

  return (
    <>
      <Outlet />
      {isEditModalOpen && <EditFeedModal />}
      {isUploadModalOpen && <Upload />}
    </>
  );
}
