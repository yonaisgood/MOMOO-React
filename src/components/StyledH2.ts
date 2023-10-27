import styled from 'styled-components';

const StyledH2 = styled.h2`
  font-size: var(--title-s);
  color: var(--gray-800);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;

  &::before,
  &::after {
    content: '';
    height: 1px;
    width: 32px;
    background: var(--gray-800);
  }
`;

export default StyledH2;
