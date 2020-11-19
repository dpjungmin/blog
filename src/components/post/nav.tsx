import React from "react"
import styled, { css } from "styled-components"
import { Link } from "gatsby"
import { Icon } from "@components"
import { theme, media } from "@styles"

const { mapCategoryToColor, fontSize } = theme

const StyledNav = styled.nav<{ category: string }>`
  ul {
    margin-top: 40px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    list-style: none;
    padding: 0;
    ${media.desktop`flex-direction: column;`}
  }
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
    ${props => css`
      color: ${mapCategoryToColor(props.category)};
    `}
    font-size: ${fontSize.lg};
  }
  .prev {
    svg {
      margin-right: 10px;
    }
  }
  .next {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
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
  return (
    <StyledNav category={category}>
      <ul>
        <li className="prev">
          {previous && (
            <>
              <p>Previous</p>
              <Link to={previous.frontmatter.slug} rel="prev">
                <Icon name="arrow-left" /> {previous.frontmatter.title}
              </Link>
            </>
          )}
        </li>
        <li className="next">
          {next && (
            <>
              <p>Next</p>
              <Link to={next.frontmatter.slug} rel="next">
                {next.frontmatter.title} <Icon name="arrow-right" />
              </Link>
            </>
          )}
        </li>
      </ul>
    </StyledNav>
  )
}

export { PostNav }
