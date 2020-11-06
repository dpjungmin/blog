import React from "react"
import styled from "styled-components"
import { useStaticQuery, graphql, Link } from "gatsby"
import Image from "gatsby-image"
import { theme, mixin } from "@styles"
import { Icon } from "@components"

interface BioProps {}

const { palette, transition } = theme

const StyledContainer = styled.div`
  ${mixin.flexCenter}
  flex-direction: column;
  position: relative;
  border-bottom: 1px solid ${palette.hr};
  padding: 0 20px 60px;
`

const StyledHeader = styled.h2`
  font-size: 35px;
`

const StyledMe = styled(Link)`
  background-color: #626ee3;
  color: white;
  padding: 15px;
  border-top-left-radius: 50%;
  border-top-right-radius: 20%;
  border-bottom-left-radius: 40%;
  border-bottom-right-radius: 20%;
  font-size: 14px;
`

const StyledSubHeader = styled.h4`
  font-size: 18px;
  margin: 0 0 40px;
`

const StyledWrapper = styled.div`
  position: relative;
`

const StyledPic = styled(Image)`
  height: 250px;
  width: 250px;
  border-radius: 50%;
  box-shadow: 0 10px 30px 1px rgba(0, 0, 0, 0.3);
  margin: 0 0 40px;
  background-color: #d7d7db;
`

const StyledSocialMedia = styled.div`
  position: absolute;
  bottom: 30px;
  right: 0;
  display: flex;
  align-items: center;
  padding: 0;
  margin: 0;
  list-style: none;
`

const StyledLink = styled.a`
  svg {
    width: 32px;
    fill: #0177b7;
    transition: ${transition};
    &:hover,
    &:focus {
      cursor: pointer;
      transform: translateY(-3px);
    }
  }
`

const StyledBio = styled.div``

const StyledBlogLink = styled(Link)`
  display: flex;
  margin-top: 20px;
  ${mixin.inlineLink}
  font-size: 20px;
  font-weight: 600;
  svg {
    width: 27px;
    margin-right: 6px;
  }
`

const Bio: React.FC<BioProps> = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic.png/" }) {
        childImageSharp {
          fixed(width: 250, height: 250, quality: 95) {
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
    author: { name, position, summary },
    social: { linkedin },
  } = data.site.siteMetadata

  return (
    <StyledContainer>
      <StyledHeader>
        {name} <StyledMe to="/me">More about me</StyledMe>
      </StyledHeader>
      <StyledSubHeader>{position}</StyledSubHeader>
      <StyledWrapper>
        <StyledPic fixed={avatar} alt={name || `profile-pic`} />
        <StyledSocialMedia>
          <StyledLink
            href={linkedin}
            className="linkedin"
            target="_blank"
            rel="nofollow noopener noreferrer"
            aria-label="linkedin"
          >
            <Icon name="linkedin" />
          </StyledLink>
        </StyledSocialMedia>
      </StyledWrapper>
      <StyledBio>
        <p>
          Hi I'm <strong>{name}</strong> {summary || null}
        </p>
      </StyledBio>
      <StyledBlogLink className="blog" to="/blog">
        <Icon name="pencil" />
        Visit my blog
      </StyledBlogLink>
    </StyledContainer>
  )
}

export { Bio }
