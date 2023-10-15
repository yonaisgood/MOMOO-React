import React from "react";
import styled from "styled-components";

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
`;

const UploadHeader = styled.header`
  height: 4.8rem;
  position: relative;
  text-align: center;
  padding: 1.2rem 1.6rem;

  h1 {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    font-size: var(--text-l);
  }

  button {
    float: right;
    color: var(--point-dark-400);
    font-size: var(--text-m);
  }

  button:hover {
    color: var(--point-dark-600);
  }
`;

const UploadContents = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PicPart = styled.section`
  width: 60%;
  aspect-ratio: 1/1;
  background-color: var(--gray-900);
`;

const SelectPart = styled.section`
  width: 40%;

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
`;

const LocationContents = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1.3rem 1.6rem;
  /* border-top: 1px solid var(--gray-200); */
  border-bottom: 1px solid var(--gray-200);
  font-size: var(--text-m);

  img {
    width: 1.6rem;
  }
`;

const AccordionContents = styled.div`
  img {
    width: 3.6rem;
    height: 3.6rem;
  }
`;

export {UploadWrapper, UploadHeader, UploadContents, PicPart, SelectPart, LocationContents, AccordionContents};
