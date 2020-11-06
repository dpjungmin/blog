import { css } from "styled-components"
import { theme } from "./theme"

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
}

export { mixin }
