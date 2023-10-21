import StyledBreadcrumbWrap from './StyledBreadcrumbWrap';
import Breadcrumb from './Breadcrumb';

type NavItem = {
  path: string;
  text: string;
};

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
