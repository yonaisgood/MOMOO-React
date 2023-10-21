import styled from 'styled-components';

type Container = {
  $arrow: string;
  $arrowGray: string;
};

const StyledBreadcrumb = styled.nav<Container>`
  margin-left: auto;

  li {
    display: inline-block;
    font-size: var(--text-m);
    color: var(--gray-600);
  }

  li.current {
    color: var(--gray-900);
  }

  li:not(:first-child)::before {
    content: '';
    display: inline-block;
    margin-right: 20px;
    width: 12px;
    aspect-ratio: 1/1;
    background: ${(props) => `url(${props.$arrow})`};
    transform: rotateZ(-90deg);
  }

  li.current::before {
    background: ${(props) => `url(${props.$arrowGray})`};
  }

  li + li {
    margin-left: 20px;
  }
`;

export default StyledBreadcrumb;
