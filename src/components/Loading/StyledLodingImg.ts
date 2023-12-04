import styled from 'styled-components';

const StyledLoadingImg = styled.img`
  margin: auto;
  width: 100px;
  aspect-ratio: 1/1;
`;

const StyledLoadingComponent = styled(StyledLoadingImg)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: auto;
  width: 72px;
`;

export { StyledLoadingImg, StyledLoadingComponent };
