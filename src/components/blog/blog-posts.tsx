import React from "react"
import styled from "styled-components"
import { Post } from "./post"
import { Search } from "@components"
import { graphql, useStaticQuery } from "gatsby"
import { media } from "@styles"
interface BlogPostsProps {
  posts: {
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
  }[]
}

const StyledContainer = styled.div`
  position: relative;
  width: 100%;
  ol {
    margin: 0;
    padding: 0;
    list-style: none;
    z-index: 1;
    li {
      &:not(:last-child) {
        margin-bottom: 20px;
      }
    }
  }
`

const StyledHeader = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
  z-index: 2;
  ${media.bigDesktop`
    flex-direction: column;
  `}
  h1 {
    font-size: 32px;
    height: 50px;
    ${media.bigDesktop`
      margin-bottom: 5px; 
    `}
  }
`

const BlogPosts: React.FC<BlogPostsProps> = ({ posts }) => {
  const data = useStaticQuery(graphql`
    query SearchIndexQuery {
      siteSearchIndex {
        index
      }
    }
  `)

  return (
    <StyledContainer>
      <StyledHeader>
        <h1>Blog Posts</h1>
        <Search searchIndex={data.siteSearchIndex.index} />
      </StyledHeader>

      <ol>
        {posts.map(post => {
          return (
            <li key={post.frontmatter.slug}>
              <Post post={post} />
            </li>
          )
        })}
      </ol>
    </StyledContainer>
  )
}

export { BlogPosts }
