import { StyledLoadingComponent } from './StyledLodingImg';

import LoadingIcon from '../../asset/icon/Loading.svg';

export default function LoadingComponent() {
  return <StyledLoadingComponent src={LoadingIcon} alt="로딩 중" />;
}
