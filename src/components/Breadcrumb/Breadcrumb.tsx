import { Link } from 'react-router-dom';

import StyledBreadcrumb from './StyledBreadcrumb';

import Arrow from '../../asset/icon/Arrow-S.svg';
import ArrowGray from '../../asset/icon/Arrow-S-Gray.svg';

interface NavItem {
  path: string;
  text: string;
}

interface Props {
  navList: NavItem[];
}

export default function Breadcrumb({ navList }: Props) {
  return (
    <StyledBreadcrumb $arrow={Arrow} $arrowGray={ArrowGray}>
      <ol>
        {navList.map((v, i) => {
          return (
            <li key={i} className={i === navList.length - 1 ? 'current' : ''}>
              <Link to={`${v.path}`}>{v.text}</Link>
            </li>
          );
        })}
      </ol>
    </StyledBreadcrumb>
  );
}
