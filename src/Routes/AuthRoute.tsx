import { Outlet, Navigate } from 'react-router-dom';

import useAuthContext from '../hooks/useAuthContext';
import useEditContext from '../hooks/useEditContext';
import useUploadContext from '../hooks/useUploadContext';

import EditFeedModal from '../components/Upload/EditFeedModal';
import Upload from '../components/Upload/Upload/Upload';

export function AuthRoute() {
  const { user } = useAuthContext();
  const { isEditModalOpen } = useEditContext();
  const { isUploadModalOpen } = useUploadContext();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Outlet />
      {isEditModalOpen && <EditFeedModal />}
      {isUploadModalOpen && <Upload />}
    </>
  );
}

export function NonAuthRoute() {
  const { user } = useAuthContext();

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
