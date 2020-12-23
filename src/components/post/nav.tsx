import React from "react"
import styled, { css } from "styled-components"
import { Link } from "gatsby"
import { Icon } from "@components"
import { theme, media } from "@styles"

const { mapCategoryToColor, fontSize } = theme

const StyledNav = styled.nav<{ category: string; end: boolean }>`
  padding: 0 14px;
  margin-top: 50px;

  display: flex;
  justify-content: ${props => (props.end ? "flex-end" : "space-between")};

  list-style: none;
  ${media.tablet`flex-direction: column;`}

  svg {
    width: 20px;
  }
  p {
    color: #78757a;
    font-size: ${fontSize.md};
    font-weight: 400;
    margin-bottom: 0.5rem;
    margin-top: 0rem;
  }
  a {
    font-size: ${fontSize.lg};
    border: 1px solid lightgray;
    padding: 10px 20px;
    border-radius: 4px;
    transition: all 0s;
    ${props => css`
      color: ${mapCategoryToColor(props.category)};
    `}
    &:hover {
      ${props => css`
        border: 1px solid ${mapCategoryToColor(props.category)};
      `}
    }
    &:not(:last-child) {
      margin-bottom: 16px;
    }
  }
  .prev {
    display: flex;
    align-self: flex-start;
    svg {
      margin-right: 10px;
    }
  }
  .next {
    display: flex;
    align-self: flex-end;
    p {
      display: flex;
      justify-content: right;
    }
    svg {
      margin-left: 10px;
    }
  }
`

interface PostNavProps {
  previous: {
    frontmatter: {
      title: string
      slug: string
    }
  }
  next: {
    frontmatter: {
      title: string
      slug: string
    }
  }
  category: string
}

const PostNav: React.FC<PostNavProps> = ({ previous, next, category }) => {
  const end = next != null && previous == null

  return (
    <StyledNav category={category} end={end}>
      {previous && (
        <Link to={previous.frontmatter.slug} rel="prev">
          <p>Previous</p>
          <div className="prev">
            <Icon name="arrow-left" />
            <span>{previous.frontmatter.title}</span>
          </div>
        </Link>
      )}
      {next && (
        <Link to={next.frontmatter.slug} rel="next">
          <p>Next</p>
          <div className="next">
            {next.frontmatter.title}
            <span>
              <Icon name="arrow-right" />
            </span>
          </div>
        </Link>
      )}
    </StyledNav>
  )
}

export { PostNav }
