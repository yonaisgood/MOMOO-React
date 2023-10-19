import styled from 'styled-components';

const AccordionWrapper = styled.div`
  width: 100%;
  padding: 0 1.6rem;
  border-bottom: 1px solid var(--gray-200);
  background-color: var(--background-color);

  .que {
    position: relative;
    width: 100%;
    padding: 1.3rem 0rem;
    transition: transform 0.3s ease-in-out;
    font-size: var(--text-m);
    cursor: pointer;
  }

  .anw {
    display: flex;
    gap: 1.4rem;
    padding: 0.9rem 0;
    overflow: hidden;

    @media (max-width: 430px) {
      gap: 0.8rem;
    }
  }

  .anw img:hover {
    width: 3.6rem;
    height: 3.6rem;
    border-radius: 50%;
    box-shadow: 1px 1px 5px var(--gray-200);
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
