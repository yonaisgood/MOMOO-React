import styled from 'styled-components';

const AccordionWrapper = styled.div`
  width: 100%;
  padding: 0 1.6rem;
  border-bottom: 1px solid var(--gray-200);
  background-color: var(--background-color);

  .que {
    position: relative;
    width: 100%;
    padding: 0.9rem 0rem;
    transition: transform 0.3s ease-in-out;
    font-size: var(--text-m);
    cursor: pointer;
  }

  .anw {
    display: flex;
    overflow: hidden;
    gap: 0.5rem;

    button {
      border-radius: 50%;
      margin-bottom: 0.3rem;
      transition: all 0.1s ease-in-out;
    }

    button:hover {
      background-color: var(--point-color);
      border-radius: 50%;
    }

    button.selected {
      background-color: var(--point-color);
    }

    .btnImg {
      margin: 0 auto;
    }

    @media (max-width: 430px) {
      button {
        width: 3.5rem;
        height: 3.5rem;
      }
    }
  }

  .arrow-wrap {
    position: absolute;
    top: 50%;
    right: 0px;
    transform: translate(0, -50%);
  }

  .que .arrow-top {
    display: block;
    transform: rotate(180deg);
    transition: transform 0.3s ease;
  }

  .que .arrow-bottom {
    display: block;
    transform: rotate(0deg);
    transition: transform 0.3s ease;
  }

  .que.on .arrow-bottom {
    display: block;
    transform: rotate(180deg);
  }

  .que.on .arrow-top {
    display: block;
    transform: rotate(180deg);
  }

  .directionIcon {
    width: 1.6rem;
    height: 1.6rem;
  }
`;

export default AccordionWrapper;
