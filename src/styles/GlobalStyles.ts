import { createGlobalStyle } from "styled-components"
import { theme, mixin, media } from "@styles"

const { palette, fonts, fontSize, transition } = theme

const GlobalStyles = createGlobalStyle`
  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  html {
    line-height: 1.5;
    font-size: ${fontSize.md};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    margin: 0;
    width: 100%;
    min-height: 100%;
    overflow-x: hidden;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    background-color: ${palette.bg};
    color: ${palette.text};
    font-family: ${fonts.body};
    font-size: 1rem;
  }

  #root {}

  #content {
    min-height: 100vh;
    display: grid;
    grid-template-rows: 1fr auto;
    grid-template-columns: 100%;
  }

  svg {
    width: 100%;
    height: 100%;
    fill: currentColor;
    vertical-align: middle;
  }

  hr {
    background-color: ${palette.hr};
    height: 1px;
    border-width: 0px;
    border-style: initial;
    border-color: initial;
    border-image: initial;
    margin: 1rem;
  }

  h1,
  h2,
  h3,
  h4, 
  h5,
  h6 {
    margin: 0 0 10px;
  }

  a {
    ${mixin.link}
  }

  p {
    margin: 0 0 10px;
    & > a {
      ${mixin.inlineLink}
    }
  }
`

export { GlobalStyles }
