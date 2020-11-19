import React, { useState, useContext, useEffect } from "react"
import styled, { css } from "styled-components"
import { theme, media } from "@styles"
import {
  GlobalStateContext,
  GlobalDispatchContext,
  SET_CATEGORY,
} from "@context"

const { mapCategoryToColor, fontSize } = theme

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

interface CategoryPorps {
  categories: {
    fieldValue: string
    totalCount: number
  }[]
}

const Category: React.FC<CategoryPorps> = ({ categories }) => {
  const [total, setTotal] = useState(0)
  const { category } = useContext(GlobalStateContext)
  const dispatch = useContext(GlobalDispatchContext)

  useEffect(() => {
    let cnt = 0
    categories.forEach(({ totalCount }) => (cnt += totalCount))
    setTotal(cnt)
  }, [categories])

  const setCategory = (category: string | undefined) => {
    dispatch({ type: SET_CATEGORY, value: category })
  }

  return (
    <StyledContainer>
      <StyledHeader>Categories</StyledHeader>
      <StyledCategory
        category="all"
        selected={category ? false : true}
        onClick={() => setCategory(undefined)}
      >
        All ({total})
      </StyledCategory>
      {categories.map(({ fieldValue, totalCount }) => {
        const _category = fieldValue[0].toUpperCase() + fieldValue.slice(1)
        return (
          <StyledCategory
            key={fieldValue}
            category={fieldValue}
            selected={category === fieldValue}
            onClick={() => setCategory(fieldValue)}
          >
            {_category} ({totalCount})
          </StyledCategory>
        )
      })}
    </StyledContainer>
  )
}

export { Category }
