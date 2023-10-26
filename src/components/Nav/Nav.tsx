import StyledNav from './StyledNav';
import MyPopup from '../MyPopup/MyPopup';
import Upload from '../Upload/Upload';
import { useState } from 'react';

export default function Nav() {
  const [openUploadModal, setOpenUploadModal] = useState(false);
  const [openMyModal, setOpenMyModal] = useState(false);

  const openUploadModalFunc = () => {
    setOpenUploadModal(true);
    document.body.classList.add('modal-open');
  };

  const openMyModalFunc = () => {
    setOpenMyModal(true);
  };

  return (
    <StyledNav>
      <div className="navBtn">
        <button className="my" onClick={openMyModalFunc}>
          My
        </button>
        <button className="upload" onClick={openUploadModalFunc}>
          Upload
        </button>
      </div>
      {openUploadModal && (
        // <div className="modal-overlay">
        <Upload setOpenPopup={setOpenUploadModal} />
        // </div>
      )}
      {openMyModal && <MyPopup setOpenPopup={setOpenMyModal} />}
    </StyledNav>
  );
}
