import styled from 'styled-components';

import LogoImg from '../../asset/icon/Logo.svg';

export default function MobileHeader() {
  return (
    <StyledH1>
      <h1 className="a11y-hidden">MoMoo</h1>
      <img src={LogoImg} alt="모무" />
    </StyledH1>
  );
}

const StyledH1 = styled.h1`
  position: fixed;
  padding: 14px 0 16px;
  width: 100%;
  border-bottom: 1px solid var(--gray-200);

  img {
    margin: auto;
    width: 112px;
    aspect-ratio: 112/18;
  }
`;
