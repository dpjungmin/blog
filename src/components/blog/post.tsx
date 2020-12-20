import React from "react"
import styled, { css } from "styled-components"
import { Link } from "gatsby"
import { Icon } from "@components"
import { theme, mixin } from "@styles"

const { mapCategoryToColor, fontSize } = theme

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
  margin: 0;
`

const StyledDate = styled.small`
  color: #6d8494;
  font-size: ${fontSize.sm};
`

const StyledTags = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const StyledTag = styled.div<{ category: string }>`
  ${mixin.flexCenter}
  font-size: 14px;
  height: 30px;
  padding: 0 10px;
  border-radius: 50px;
  border: none;
  overflow: hidden;
  margin-bottom: 4px;
  ${props => css`
    color: ${mapCategoryToColor(props.category)};
    background-color: ${mapCategoryToColor(props.category, false, true)};
  `}
  &:not(:last-child) {
    margin-right: 10px;
  }
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

interface PostProps {
  post: {
    excerpt: string
    timeToRead: string
    frontmatter: {
      title: string
      date: string
      description: string
      category: string
      slug: string
      tags: string[]
    }
  }
}

const Post: React.FC<PostProps> = ({ post }) => {
  const { excerpt, timeToRead, frontmatter } = post
  const { title, date, description, category, slug, tags } = frontmatter

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
        <StyledTags>
          {tags &&
            tags.map(tag => (
              <StyledTag key={tag} category={category}>
                {tag}
              </StyledTag>
            ))}
        </StyledTags>
        <StyledDescription>
          <p
            dangerouslySetInnerHTML={{
              __html: description || "",
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
