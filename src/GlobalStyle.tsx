import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}

  * {
    box-sizing: border-box;
  }

  body {
    color: inherit;
    font-family: 'Noto Sans', sans-serif;
    line-height: 1.5;
  }

  :root {
    --primary-color:#121212;
    --background-color:#F8F8F8;

    --point-light-200:#F0F7F8;
    --point-light-100:#CCE5E9;
    --point-color:#A9D3D9;
    --point-dark-100:#86C1C9;
    --point-dark-200:#62AFBA;
    --point-dark-300:#4796A2;
    --point-dark-400:#38757E;
    --point-dark-500:#28545B;
    --point-dark-600:#193437;

    --point-desaturate-100:#E3E9EA;
    --point-desaturate-200:#C6D2D4;
    --point-desaturate-300:#A9BBBE;
    --point-desaturate-400:#8CA4A8;
    --point-desaturate-500:#6F8D92;
    --point-desaturate-600:#597175;
    --point-desaturate-700:#435558;
    --point-desaturate-800:#2D393B;

    --gray-100:#EBEBEB;
    --gray-200:#D2D2D2;
    --gray-300:#B8B8B8;
    --gray-400:#9F9F9F;
    --gray-500:#858585;
    --gray-600:#6C6C6C;
    --gray-700:#525252;
    --gray-800:#393939;
    --gray-900:#1F1F1F;

    --error-color: #DE3F35;

    --serif : 'Prata', serif;
    --title-font-family : 'Prata', 'Noto Sans', sans-serif;

    font-size: 10px;
    --title-xl: 5rem;
    --title-l: 3.2rem;
    --title-m: 2.4rem;
    --title-s: 2rem;
    --text-l: 1.6rem;
    --text-m: 1.4rem;
    --text-s: 1.2rem;

    --nav-width-pc: 256px;
    --nav-height-tablet: 80px;
    --nav-height-mobile: 48px;

    --right-padding-pc: 216px;
    --padding-top-pc: 100px;

    --column-pc : calc((100vw - var(--nav-width-pc) - 190px - var(--margin-pc) * 2 - var(--gutter-pc) * 11) / 12);
    --gutter-pc: 16px;
    --margin-pc: 28px;

    --column-tablet : calc((100vw - var(--margin-tablet) * 2 - var(--gutter-tablet) * 7) / 8);
    --gutter-tablet: 16px;
    --margin-tablet: 24px;

    --margin-mobile: 16px;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button, input, textarea {
    font-family: 'Noto Sans', sans-serif;
    padding: 0;
    border: none;
    font-size: inherit;
    line-height: inherit;
    font-weight: inherit;
    color: inherit;
    background-color: inherit;
  }

  button {
    cursor: pointer;
  }

  ol, ul, li {
    list-style: none;
  }

  img {
    display: block;
    width: 100%;
    height: 100%;
  }

   dialog::backdrop {
  background: rgba(0, 0, 0, 0.5);
  }
`;

export default GlobalStyle;
