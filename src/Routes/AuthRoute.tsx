import { Outlet, Navigate } from 'react-router-dom';
import useAuthContext from '../hooks/useAuthContext';
import useEditContext from '../hooks/useEditContext';
import EditFeed from '../components/Upload/EditFeed';
import useUploadContext from '../hooks/useUploadContext';
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
      {isEditModalOpen && <EditFeed />}
      {isUploadModalOpen && <Upload />}
    </>
  );
}

export function NonAuthRoute() {
  const { user } = useAuthContext();

  if (user) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
}
