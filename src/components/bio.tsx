import React from "react"
import styled from "styled-components"
import Image from "gatsby-image"
import { useStaticQuery, graphql } from "gatsby"
import { theme, mixin, media } from "@styles"
import { Icon } from "@components"

const { palette, transition } = theme

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
    width: 24px;
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
  margin-left: 20px;
  transform: translateY(-14px);
  h3 {
    margin: 0 0 5px;
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
      <StyledWrapper>
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
        <h3>{position}</h3>
        <p>{summary || null}</p>
      </StyledBio>
    </StyledContainer>
  )
}

export { Bio }
