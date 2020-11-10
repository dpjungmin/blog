import { css } from "styled-components"

const sizes: { [key: string]: number } = {
  giant: 1920,
  huge: 1440,
  bigDesktop: 1200,
  desktop: 1000,
  tablet: 768,
  thone: 600,
  phablet: 480,
  phone: 376,
  tiny: 330,
}

// Iterate through the sizes and create a media template
const media = Object.keys(sizes).reduce(
  (accumulator: { [key: string]: any }, label: string) => {
    const emSize = sizes[label] / 16
    accumulator[label] = (first: any) => css`
      @media (max-width: ${emSize}em) {
        ${css(first)}
      }
    `
    return accumulator
  },
  {}
)

export { media }
