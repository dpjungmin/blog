import React from "react"
import styled, { css } from "styled-components"
import { Link } from "gatsby"
import { Icon } from "@components"
import { theme } from "@styles"

const { mapCategoryToColor, fontSize } = theme

interface PostProps {
  post: {
    excerpt: string
    timeToRead: string
    fields: {
      slug: string
    }
    frontmatter: {
      title: string
      date: string
      description: string
      category: string
    }
  }
}

const StyledContainer = styled.article<{ category: string }>`
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(50, 50, 93, 0.1);
  border-radius: 4px;
  padding: 20px;
  ${props => css`
    border-left: 4px solid ${mapCategoryToColor(props.category)};
  `}
  cursor: pointer;
  transition: box-shadow 0.2s, transform 0.2s;
  &:hover {
    box-shadow: 2px 2px 10px 1px rgba(50, 50, 93, 0.1);
    transform: translateY(-4px);
  }
`

const StyledLink = styled(Link)`
  width: 100%;
`

const StyledHeader = styled.header`
  margin: 0 0 15px;
`

const StyledTitle = styled.h3`
  font-size: ${fontSize.xl};
  margin: 0 0 5px;
`

const StyledDate = styled.small`
  color: #6d8494;
  font-size: ${fontSize.sm};
`

const StyledDescription = styled.section`
  font-size: ${fontSize.md};
`

const StyledTimeToRead = styled.div<{ category: string }>`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  svg {
    width: 15px;
    margin: 0 5px 0 0;
    ${props =>
      css`
        color: ${mapCategoryToColor(props.category)};
      `}
  }
  span {
    font-size: ${fontSize.sm};
    font-weight: 700;
    ${props =>
      css`
        color: ${mapCategoryToColor(props.category)};
      `}
  }
`

const Post: React.FC<PostProps> = ({ post }) => {
  const { excerpt, timeToRead, fields, frontmatter } = post
  const { slug } = fields
  const { title, date, description, category } = frontmatter

  return (
    <StyledContainer
      itemScope
      itemType="http://schema.org/Article"
      category={category}
    >
      <StyledLink to={slug} itemProp="url">
        <StyledHeader>
          <StyledTitle>
            <span itemProp="headline">{title}</span>
          </StyledTitle>
          <StyledDate>{date}</StyledDate>
        </StyledHeader>
        <StyledDescription>
          <p
            dangerouslySetInnerHTML={{
              __html: description || excerpt,
            }}
            itemProp="description"
          />
        </StyledDescription>
        <StyledTimeToRead category={category}>
          <Icon name="clock" /> <span>{timeToRead} min read</span>
        </StyledTimeToRead>
      </StyledLink>
    </StyledContainer>
  )
}

export { Post }
