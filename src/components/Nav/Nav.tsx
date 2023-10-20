import StyledNav from './StyledNav';
import MyPopup from '../MyPopup/MyPopup';
import { useState } from 'react';

export default function Nav() {
  const [openPopup, setOpenPopup] = useState(false);

  return <StyledNav>{openPopup && <MyPopup />}</StyledNav>;
}
