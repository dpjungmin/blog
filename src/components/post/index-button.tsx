import React from "react"
import styled, { css } from "styled-components"
import { Link } from "gatsby"
import { Icon } from "@components"
import { theme, mixin } from "@styles"

const { mapCategoryToColor } = theme

const StyledContainer = styled.div`
  /* ${mixin.flexAround} */
`

const StyledButton = styled(Link)<{ category: string }>`
  ${props => css`
    background-color: ${mapCategoryToColor(props.category)};
    &:hover {
      transform: translateX(-4px);
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
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.5);
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
      <StyledButton to="/blog" category={category}>
        <Icon name="arrow-left" />
        Index
      </StyledButton>
    </StyledContainer>
  )
}

export { IndexButton }
