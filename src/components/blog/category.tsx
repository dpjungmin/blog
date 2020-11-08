import React from "react"
import styled, { css } from "styled-components"
import { theme, media } from "@styles"

const { mapCategoryToColor, fontSize } = theme

interface CategoryPorps {
  selected: string | undefined
  setSelected: React.Dispatch<React.SetStateAction<string | undefined>>
  categories: {
    fieldValue: string
    totalCount: number
  }[]
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 0;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 30px 60px -12px rgba(50, 50, 93, 0.25),
    0 18px 36px -18px rgba(0, 0, 0, 0.3);
  margin: 0 30px 0 0;
  border-radius: 4px;
  overflow-y: auto;
  max-height: calc(100vh - 40px);
  width: 265px;
  height: 100%;
  transform: translateY(90px);
  ${media.tablet`display: none;`};
`

const StyledHeader = styled.h4`
  font-size: ${fontSize.md};
  font-weight: 600;
  color: #02203c;
`

const StyledCategory = styled.div<{ category: string; selected: boolean }>`
  cursor: pointer;
  font-size: ${fontSize.sm};
  padding: 8px 25px;
  margin: 0 -20px;
  position: relative;
  &::before {
    content: "";
    ${props => css`
      background-color: ${mapCategoryToColor(props.category)};
    `}
    border-radius: 4px;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    transform: translate(10px, 14px) scale(0.1);
    transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1) 0s;
  }
  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
    &::before {
      opacity: 1;
      transform: translate(10px, 14px) scale(1);
      width: 8px;
      height: 8px;
    }
  }
  ${props =>
    props.selected &&
    css`
      cursor: default;
      background-color: rgba(0, 0, 0, 0.04);
      &::before {
        opacity: 1;
        transform: translate(10px, 14px) scale(1);
        width: 8px;
        height: 8px;
      }
    `}
`

const Category: React.FC<CategoryPorps> = ({
  selected,
  setSelected,
  categories,
}) => {
  return (
    <StyledContainer>
      <StyledHeader>Categories</StyledHeader>
      <StyledCategory
        category="all"
        selected={selected ? false : true}
        onClick={() => setSelected(undefined)}
      >
        All
      </StyledCategory>
      {categories.map(({ fieldValue, totalCount }) => {
        const category = fieldValue[0].toUpperCase() + fieldValue.slice(1)
        return (
          <StyledCategory
            key={fieldValue}
            category={fieldValue}
            selected={selected === fieldValue}
            onClick={() => setSelected(fieldValue)}
          >
            {category}
          </StyledCategory>
        )
      })}
    </StyledContainer>
  )
}

export { Category }
