import Breadcrumb from './Breadcrumb';
import StyledBreadcrumbWrap from './StyledBreadcrumbWrap';

interface NavItem {
  path: string;
  text: string;
}

interface Props {
  navList: NavItem[];
  title: string;
}

export default function BreadcrumbWrap({ navList, title }: Props) {
  return (
    <StyledBreadcrumbWrap>
      <h2>{title}</h2>
      <Breadcrumb navList={navList} />
    </StyledBreadcrumbWrap>
  );
}
