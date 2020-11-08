import { css } from "styled-components"
import { theme } from "./theme"
import { media } from "./media"

const { palette, transition } = theme

const mixin = {
  flexCenter: css`
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  flexBetween: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,

  flexAround: css`
    display: flex;
    align-items: center;
    justify-content: space-around;
  `,

  link: css`
    display: inline-block;
    text-decoration: none;
    text-decoration-skip-ink: auto;
    color: inherit;
    position: relative;
    transition: ${transition};
    cursor: pointer;
    &:hover,
    &:active,
    &:focus {
      outline: 0;
    }
  `,

  inlineLink: css`
    color: ${palette.link};
    &:hover,
    &:active,
    &:focus {
      outline: 0;
      color: ${palette.linkHover};
    }
  `,

  boxShadow: {
    picture: css`
      box-shadow: 0 10px 30px 1px rgba(0, 0, 0, 0.3);
    `,
    button: css`
      box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.5);
    `,
  },

  container: css`
    margin: 0 auto;
    width: 100%;
    max-width: 1600px;
    min-height: 100vh;

    padding-left: 150px;
    padding-right: 150px;
    padding-top: 140px;
    padding-bottom: 200px;

    ${media.desktop`
      padding-left: 60px;
      padding-right: 60px;
      padding-top: 140px;
      padding-bottom: 175px;
    `};

    ${media.tablet`
      padding-left: 40px;
      padding-right: 40px;
      padding-top: 140px;
      padding-bottom: 150px;
    `};

    ${media.phablet`
      padding-left: 15px;
      padding-right: 15px;
      padding-top: 160px;
      padding-bottom: 125px;
    `};

    &.fillSide {
      padding-left: 0;
      padding-right: 0;
    }

    &.fillHeight {
      padding-top: 0;
      padding-bottom: 0;
    }
  `,
}

export { mixin }
