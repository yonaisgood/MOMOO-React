import styled, { css } from 'styled-components';

const sizeStyles = {
  l: css`
    width: 48rem;
    padding: 1rem 0;
    line-height: 4.8rem;
    font-size: var(--title-m);
  `,
  m: css`
    width: 35.8rem;
    padding: 1rem 0;
    line-height: 3.58rem;
    font-size: var(--title-s);
  `,
  s: css`
    width: 100%;
    padding: 1rem 0;
    line-height: 2.88rem;
    font-size: var(--text-l);
  `,
  xs: css`
    width: 10rem;
    height: 4rem;
    padding: 1rem 0;
    line-height: 10rem;
    font-size: var(--text-m);
  `,
};

const BtnStyle = styled.button<{ size?: 'l' | 'm' | 's' | 'xs' }>`
  ${({ size }) => sizeStyles[size || 'l'] || ''}

  background-color: var(--gray-800);
  color: var(--gray-100);
  font-family: var(--serif);
  transition: color 0.3s ease-in-out;

  &:hover {
    color: var(--point-color);
  }

  &:disabled {
    background-color: var(--gray-200);
    color: var(--gray-800);
    cursor: default;
  }
`;

export { sizeStyles, BtnStyle };
