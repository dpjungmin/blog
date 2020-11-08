import React from "react"
import styled from "styled-components"
import Image from "gatsby-image"
import { useStaticQuery, graphql, Link } from "gatsby"
import { theme, mixin, media } from "@styles"
import { Icon } from "@components"

interface BioProps {}

const { palette, fontSize, transition } = theme

const StyledContainer = styled.div`
  ${mixin.flexCenter}
  min-height: 100vh;
  flex-direction: column;
  position: relative;
  padding: 20px 40px;
`

const StyledHeader = styled.h2`
  font-size: 35px;
  ${media.phablet`
    width: 100%;  
    justify-content: right;
  `}
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
  ${mixin.boxShadow.picture}
  margin: 0 0 40px;
  background-color: ${palette.picBg};
`

const StyledLinkedInLink = styled.div`
  position: absolute;
  bottom: 30px;
  right: 4px;
  display: flex;
  align-items: center;
  padding: 0;
  margin: 0;
  list-style: none;
  svg {
    width: 32px;
    fill: ${palette.blue};
    transition: ${transition};
    &:hover,
    &:focus {
      cursor: pointer;
      transform: translateY(-3px);
    }
  }
`

const StyledBio = styled.div`
  ${mixin.flexCenter}
`

const StyledLinkBlock = styled.div`
  ${mixin.flexAround}
  margin-top: 20px;
  font-weight: 600;
  font-size: ${fontSize.md};
  ${media.phablet`
    width: 100%;
    justify-content: right;
  `}
`
const StyledLink = styled(Link)`
  background-color: ${palette.purple};
  ${mixin.boxShadow.button}
  border-radius: 4px;
  color: white;
  padding: 15px 30px;
  &:hover {
    background-color: ${palette.purpleHover};
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
      <StyledHeader>{name}</StyledHeader>
      <StyledSubHeader>{position}</StyledSubHeader>
      <StyledWrapper>
        <div></div>
        <StyledPic fixed={avatar} alt={name || `profile-pic`} />
        <StyledLinkedInLink>
          <a
            href={linkedin}
            target="_blank"
            rel="nofollow noopener noreferrer"
            aria-label="linkedin"
          >
            <Icon name="linkedin" />
          </a>
        </StyledLinkedInLink>
      </StyledWrapper>
      <StyledBio>
        <p>
          Hi I'm <strong>{name}</strong> {summary || null}
        </p>
      </StyledBio>
      <StyledLinkBlock>
        <StyledLink to="/blog">Blog</StyledLink>
      </StyledLinkBlock>
    </StyledContainer>
  )
}

export { Bio }
