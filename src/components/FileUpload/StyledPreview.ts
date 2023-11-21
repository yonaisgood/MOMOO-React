import styled from 'styled-components';

interface IndicatorProps {
  active: boolean;
}

const ImgSlidePcSize = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 430px) {
    display: none;
  }
`;

const ImageGrid = styled.div`
  display: none;
  width: 100%;
  height: 11.2rem;
  gap: 1rem;
  overflow-x: scroll;
  &::webkit-scrollbar-thumb {
    background-color: none;
  }
  &::-webkit-scrollbar-thumb {
    background-color: none;
  }

  img {
    width: 100%;
    height: auto;
    object-fit: contain;
  }

  @media (max-width: 430px) {
    display: flex;

    img {
      width: 11.2rem;
      aspect-ratio: 1/1;
      background-color: var(--gray-900);
    }
  }
`;

const PreviewSection = styled.section`
  width: 100%;
  aspect-ratio: 1/1;
  position: relative;

  .btnUpload {
    width: 3.4rem;
    height: 3.4rem;
    position: absolute;
    bottom: 5.4rem;
    right: 2.4rem;
    cursor: pointer;
  }

  #file {
    display: none;
  }

  .selectImg {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @media (max-width: 1024px) {
    .btnUpload {
      width: 3rem;
      height: 3rem;
    }
  }

  @media (max-width: 430px) {
    visibility: visible;
    width: 100%;
    height: 11.2rem;
    display: flex;
    flex-direction: row;

    .btnUpload {
      left: 0;
      bottom: 0;
    }
  }
`;

const PreviewSlider = styled.div`
  width: 100%;
  height: calc(100% - 3rem);
  margin: 0 auto;

  button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    box-sizing: content-box;
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 50%;
    padding: 4px 3.5px 4px 4.5px;
  }
  .ArrowBack {
    left: 8px;
    transform: translateY(-50%) rotate(180deg);
  }

  .ArrowRight {
    right: 8px;
    padding: 4px 3.5px 4px 4.5px;
  }

  img {
    width: 16px;
    aspect-ratio: 1/1;
  }
  @media (max-width: 430px) {
    height: calc(100% - 0rem);
  }
`;

const IndicatorBasicBox = styled.div`
  width: 100%;
  height: 3rem;
  background-color: var(--background-color);

  @media (max-width: 430px) {
    display: none;
  }
`;

const IndicatorContainer = styled.div`
  width: 100%;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;

  @media (max-width: 430px) {
    display: none;
  }
`;

const Indicator = styled.div<IndicatorProps>`
  width: 0.6rem;
  aspect-ratio: 1/1;
  border-radius: 50%;
  background-color: ${(props) =>
    props.active ? 'var(--gray-900)' : 'var(--gray-300)'};
  cursor: pointer;
  display: flex;
  gap: 2rem;
  margin-right: 0.6rem;
`;

export {
  ImgSlidePcSize,
  ImageGrid,
  PreviewSection,
  PreviewSlider,
  IndicatorBasicBox,
  IndicatorContainer,
  Indicator,
};
