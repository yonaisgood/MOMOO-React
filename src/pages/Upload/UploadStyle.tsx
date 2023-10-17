import React from 'react';
import styled from 'styled-components';

const UploadWrapper = styled.div`
  width: 80rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  background-color: var(--background-color);
  color: var(--gray-900);
  overflow: hidden;

  @media (max-width: 1024px) {
    width: 52rem;
    transform: translate(-50%, -50%);
  }

  @media (max-width: 768px) {
    width: 49rem;
    transform: translate(-50%, -50%);
  }

  @media (max-width: 430px) {
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    transform: none;
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
    width: 11.2rem;
    margin-top: 1.2rem;
    /* height: 11.2rem; */
  }
`;

const SelectPart = styled.section`
  width: 100%;

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
      overflow-y: auto;
    }
  }

  @media (max-width: 430px) {
    .inputWrapper {
      border-top: none;
    }
  }
`;

const UploadContents = styled.div`
  width: 100;
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
    /* justify-content: center; */
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
  display: flex;
  justify-content: space-between;
  padding: 1.3rem 1.6rem;
  border-bottom: 1px solid var(--gray-200);
  font-size: var(--text-m);
  color: var(--gray-600);

  img {
    width: 1.6rem;
  }
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

export {
  UploadWrapper,
  BackButton,
  UploadHeader,
  UploadContents,
  PicPart,
  SelectPart,
  LocationContents,
  AccordionContents,
};
