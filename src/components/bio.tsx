import React from "react"
import styled from "styled-components"
import Image from "gatsby-image"
import { useStaticQuery, graphql } from "gatsby"
import { theme, mixin, media } from "@styles"
import { Icon } from "@components"

const { palette } = theme

const StyledContainer = styled.div`
  ${mixin.flexCenter}
  position: relative;
  margin-bottom: 100px;
  ${media.tablet`
    margin-bottom: 80px;
    flex-direction: column;
    align-items: flex-start;
  `}
`

const StyledPic = styled(Image)`
  height: 250px;
  width: 250px;
  border-radius: 50%;
  ${mixin.boxShadow.picture}
  margin: 0 0 40px;
  background-color: ${palette.picBg};
`

const StyledBio = styled.div`
  margin-left: 20px;
  h3 {
    margin: 0 0 5px;
    span {
      font-size: 16px;
      color: darkslateblue;
    }
  }
  svg {
    width: 32px;
    height: 32px;
    color: rgb(173, 181, 189);
    &:hover {
      color: black;
    }
  }
`

const StyledLinks = styled.div`
  margin-top: 16px;
`

const StyledLink = styled.a`
  position: relative;
  &:not(:last-child) {
    margin-right: 14px;
  }
  &.email {
    div {
      display: none;
      position: absolute;
      left: 120%;
      top: 0;
      background-color: rgba(0, 0, 0, 0.6);
      color: #fff;
      border-radius: 4px;
      padding: 6px 8px;
      font-size: 14px;
    }
    &:hover > div {
      display: block;
    }
  }
`

interface BioProps {}

const Bio: React.FC<BioProps> = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.png/" }) {
        childImageSharp {
          fixed(width: 150, height: 150, quality: 95) {
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
            github
            email
          }
        }
      }
    }
  `)

  const avatar = data.avatar.childImageSharp?.fixed
  const {
    author: { name, position, summary },
    social: { linkedin, github, email },
  } = data.site.siteMetadata

  return (
    <StyledContainer>
      <StyledPic fixed={avatar} alt={name || `profile-pic`} />
      <StyledBio>
        <h3>
          {name} <span>({position})</span>
        </h3>
        <p>{summary || null}</p>
        <StyledLinks>
          <StyledLink
            href={github}
            target="_blank"
            rel="nofollow noopener noreferrer"
            aria-label="github"
          >
            <Icon name="github" />
          </StyledLink>
          <StyledLink
            href={linkedin}
            target="_blank"
            rel="nofollow noopener noreferrer"
            aria-label="linkedin"
          >
            <Icon name="linkedin" />
          </StyledLink>
          <StyledLink href={`mailto:${email}`} className="email">
            <Icon name="email" />
            <div>{email}</div>
          </StyledLink>
        </StyledLinks>
      </StyledBio>
    </StyledContainer>
  )
}

export { Bio }
