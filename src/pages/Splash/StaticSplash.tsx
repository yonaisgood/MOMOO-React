import StyledSplash from './StyledSplash';

import Logo from '../../asset/icon/Logo.svg';

export default function StaticSplash() {
  return (
    <StyledSplash>
      <img src={Logo} alt="모무" />
    </StyledSplash>
  );
}
