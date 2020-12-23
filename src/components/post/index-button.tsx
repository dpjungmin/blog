import React from "react"
import styled, { css } from "styled-components"
import { Link } from "gatsby"
import { Icon } from "@components"
import { theme, mixin, media } from "@styles"

const { mapCategoryToColor } = theme

const StyledContainer = styled.div`
  /* ${mixin.flexAround} */
  ${media.tablet`margin-left: 20px;`}
`

const StyledButton = styled(Link)<{ category: string }>`
  ${props => css`
    background-color: ${mapCategoryToColor(props.category)};
    &:hover {
      background-color: ${mapCategoryToColor(props.category, true)};
    }
  `}
  color: white;
  height: 40px;
  font-size: 14px;
  border-radius: 4px;
  padding: 0 40px;
  color: #fff;
  transition: all 0.2s;
  position: relative;
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  border: none;
  transition: background 120ms ease-out 0s, color 120ms ease-out 0s,
    box-shadow 120ms ease-out 0s;
  border-radius: 6px;
  box-shadow: rgba(8, 35, 51, 0.1) 0px 2px 4px;
  &:active {
    transform: translate3d(0px, 1px, 0px);
  }
  &::after {
    display: none !important;
  }
  svg {
    width: 20px;
    margin-right: 10px;
  }
`

interface IndexButtonProps {
  category: string
}

const IndexButton: React.FC<IndexButtonProps> = ({ category }) => {
  return (
    <StyledContainer>
      <StyledButton to="/" category={category}>
        <Icon name="arrow-left" />
        Index
      </StyledButton>
    </StyledContainer>
  )
}

export { IndexButton }
