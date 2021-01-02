import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { media } from "@styles"

const StyledContainer = styled.div`
  position: absolute;
  left: 100%;
  z-index: 100;
  height: 100%;
  @media (max-width: 1350px) {
    display: none;
  }
`

const StyledWrapper = styled.div`
  height: 100%;
  position: relative;
  margin-top: 30px;
  margin-left: 40px;
  ${media.huge`margin-left: 20px;`}
`

const StyledTOC = styled.div`
  position: -webkit-sticky;
  position: sticky;
  transition: background-color 0.2s, border 0.2s, color 0.2s, box-shadow 0.2s;
  padding: 10px 14px 10px 4px;
  border-left: 2px solid #d9d7e0;
  border-radius: 2px;
  top: 112px;
  width: 250px;
  font-size: 14px;
  max-height: 80vh;
  overflow-y: auto;
  p {
    margin: 0;
  }
  ul {
    padding-left: 14px;
    list-style: none;
    margin: 0;
    line-height: 1.6;
    li {
      display: block;
    }
    a {
      color: #78757a;
      transition: all 0s;
      transition: transform 0.125s ease-in 0s;
      transform-origin: right center;
      &::after {
        content: none;
      }
      &:hover,
      &:focus,
      &:active {
        color: #36313d !important;
      }
      &.active {
        transform: scale(1.05);
        color: #36313d;
      }
    }
  }
`

interface TOCProps {
  toc: string
}

const TOC: React.FC<TOCProps> = ({ toc }) => {
  const [anchors, setAnchors] = useState<
    NodeListOf<HTMLAnchorElement> | undefined
  >()
  const [headings, setHeadings] = useState<number[]>([])

  useEffect(() => {
    setAnchors(document.querySelector(".post-toc")?.querySelectorAll("a"))
    const _headings = document
      .querySelector(".post-content")
      ?.querySelectorAll("h1, h2, h3, h4, h5, h6")
    _headings?.forEach(heading => {
      const rect = heading.getBoundingClientRect()
      setHeadings(prev => [...prev, rect.top + window.pageYOffset - 20])
    })
  }, [])

  useEffect(() => {
    if (!headings) return
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [headings])

  const handleScroll = () => {
    const scrollPos = window.pageYOffset
    if (!anchors) return
    for (let i = 0; i < headings.length; i++) {
      if (anchors[i].classList) {
        anchors[i].classList.toggle(
          "active",
          i === headings.length - 1
            ? scrollPos >= headings[i]
            : scrollPos >= headings[i] && scrollPos < headings[i + 1]
        )
      }
    }
  }

  if (!toc) return null

  return (
    <StyledContainer>
      <StyledWrapper>
        <StyledTOC
          className="post-toc"
          dangerouslySetInnerHTML={{ __html: toc }}
        />
      </StyledWrapper>
    </StyledContainer>
  )
}

export { TOC }
