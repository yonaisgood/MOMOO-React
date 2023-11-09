import styled from 'styled-components';

const UploadWrapper = styled.div`
  width: 80rem;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  background-color: var(--background-color);
  color: var(--gray-900);
  z-index: 101;
  overflow: hidden;

  @media (max-width: 1024px) {
    width: 52rem;
    min-height: 93rem;
    overflow: scroll;
    scroll-behavior: hidden;
  }

  @media (max-width: 768px) {
    width: 49rem;
  }

  @media (max-width: 430px) {
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    transform: none;
    border-radius: 0px;
  }
`;

const UploadHeader = styled.header`
  height: 4.8rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem 1.6rem;

  h1 {
    font-size: var(--text-l);
  }

  button {
    color: var(--point-dark-400);
    font-size: var(--text-m);
  }

  button:hover {
    color: var(--point-dark-600);
  }

  @media (max-width: 430px) {
    border-bottom: 1px solid var(--gray-200);
  }
`;

const BackButton = styled.button`
  cursor: pointer;
  visibility: hidden;

  @media (max-width: 430px) {
    visibility: visible;
  }
`;

const PicPart = styled.section`
  width: 100%;
  aspect-ratio: 1/1;
  background-color: var(--gray-900);

  @media (max-width: 430px) {
    width: 100vm;
    margin-top: 1.2rem;
    margin-left: 1.6rem;
    background-color: var(--background-color);
  }
`;

const SelectPart = styled.section`
  position: relative;
  width: 100%;
  aspect-ratio: 2/3;

  .inputWrapper {
    padding: 1.3rem 1.6rem;
    border-top: 1px solid var(--gray-200);
    border-bottom: 1px solid var(--gray-200);
    font-size: var(--text-m);
  }

  input {
    width: 100%;
    outline: none;
  }

  .uploadInfo {
    border-bottom: 1px solid var(--gray-200);
    height: 11.4rem;

    textarea {
      width: 100%;
      padding: 1.3rem 1.6rem;
      outline: none;
      border: none;
      font-size: var(--text-m);
      height: auto;
      max-height: 11.4rem;
      resize: none;
    }
  }

  @media (max-width: 430px) {
    .inputWrapper {
      border-top: none;
    }
  }
`;

const UploadContents = styled.div`
  width: 100%;
  height: 48rem;
  display: flex;
  justify-content: space-between;

  & > ${PicPart} {
    flex: 6; /* 전체 너비의 60% */
  }

  & > ${SelectPart} {
    flex: 4; /* 전체 너비의 40% */
  }

  @media (max-width: 1024px) {
    flex-direction: column;
  }

  @media (max-width: 430px) {
    & > ${PicPart} {
      flex: 1; /* 전체 너비의 60% */
    }

    & > ${SelectPart} {
      flex: 1; /* 전체 너비의 40% */
    }
  }
`;

const LocationContents = styled.div`
  padding: 0.9rem 1.6rem;
  border-bottom: 1px solid var(--gray-200);
  font-size: var(--text-m);
  color: var(--gray-900);

  .locationHead {
    display: flex;
    justify-content: space-between;
    cursor: pointer;
  }

  .rotate {
    transform: rotate(180deg);
    transition: transform 0.3s ease-in-out;
  }

  img {
    width: 1.6rem;
  }

  .toggle-icon {
    transform: rotate(180deg);
    transition: transform 0.3s ease;
  }

  @media (max-width: 430px) {
    padding: 1.3rem 1.6rem;
    background-color: var(--background-color);
  }
`;

const KakaoMapContainer = styled.div`
  width: inherit;
  z-index: 1;
  position: absolute;
`;

const AccordionContents = styled.div`
  img {
    width: 3.6rem;
    aspect-ratio: 1/1;
  }

  @media (max-width: 430px) {
    img {
      width: 2.4rem;
    }
  }
`;

const CloseBtn = styled.button`
  position: fixed;
  top: 2rem;
  right: 2rem;
  background-color: transparent;
  z-index: 101;

  @media (max-width: 430px) {
    visibility: hidden;
  }
`;

export {
  UploadWrapper,
  BackButton,
  UploadHeader,
  UploadContents,
  PicPart,
  SelectPart,
  LocationContents,
  KakaoMapContainer,
  AccordionContents,
  CloseBtn,
};
