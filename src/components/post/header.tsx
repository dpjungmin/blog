import React from "react"
import styled, { css } from "styled-components"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import { mixin, theme, media } from "@styles"
import { Icon } from "@components"

const { mapCategoryToColor, fontSize } = theme

const StyledHeader = styled.header<{ category: string }>`
  padding: 20px;
  display: flex;
  flex-direction: column;
  .wrapper {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    ${media.tablet`flex-direction: column;`}
  }
  .profile {
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 7px 20px 0 rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    padding: 10px;
    align-self: flex-start;
    flex: 0 0 auto;
    margin: 0 20px 0 0;
    transition: box-shadow 0.2s, transform 0.2s;
    &:hover {
      ${props => css`
        box-shadow: 0 7px 20px 0
          ${mapCategoryToColor(props.category, false, true)};
      `}
      transform: translateY(-3px);
    }
    ${media.tablet`margin-bottom: 15px;`}
  }
  .name {
    font-weight: 600;
    color: #02203c;
  }
  .meta-data {
    font-weight: 600;
    ${props => css`
      color: ${mapCategoryToColor(props.category)};
    `}
  }
  p {
    font-size: ${fontSize.sm};
    margin: 0;
    svg {
      width: 15px;
      margin-right: 5px;
      transform: translateY(-1px);
    }
  }
  h1 {
    margin: 60px 0 0;
    font-size: 34px;
    ${mixin.flexCenter}
    ${media.tablet`
      order: -1;
      margin: 0 0 30px;
    `}
  }
`

const StyledPic = styled(Image)`
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(50, 50, 93, 0.2);
  background-color: #fff;
  width: 50px;
  margin: 0 10px 0 0;
`

interface PostHeaderProps {
  category: string
  date: string
  timeToRead: number
  title: string
}

const PostHeader: React.FC<PostHeaderProps> = ({
  category,
  date,
  timeToRead,
  title,
}) => {
  const data = useStaticQuery(graphql`
    query {
      avatar: file(absolutePath: { regex: "/profile-pic.png/" }) {
        childImageSharp {
          fixed(width: 50, height: 50, quality: 95) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author {
            name
            position
            summary
          }
          social {
            linkedin
          }
        }
      }
    }
  `)

  const avatar = data.avatar.childImageSharp?.fixed
  const {
    author: { name, position },
    social: { linkedin },
  } = data.site.siteMetadata

  return (
    <StyledHeader category={category}>
      <div className="wrapper">
        <a
          className="profile"
          href={linkedin}
          target="_blank"
          rel="nofollow noopener noreferrer"
          aria-label="linkedin"
        >
          <StyledPic fixed={avatar} alt={name || `profile-pic`} />
          <div>
            <p className="name">{name}</p>
            <p className="position">{position}</p>
          </div>
        </a>
        <p className="meta-data">
          {date} — <Icon name="clock" />
          {timeToRead} min read
        </p>
      </div>
      <h1 itemProp="headline">{title}</h1>
    </StyledHeader>
  )
}

export { PostHeader }
