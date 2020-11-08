import React from "react"
import styled from "styled-components"
import { Post } from "./post"

interface BlogPostsProps {
  posts: {
    excerpt: string
    timeToRead: string
    fields: {
      slug: string
    }
    frontmatter: {
      title: string
      date: string
      description: string
      category: string
    }
  }[]
}

const StyledContainer = styled.div`
  width: 100%;
  ol {
    margin: 0;
    padding: 0;
    list-style: none;
    li {
      &:not(:last-child) {
        margin-bottom: 20px;
      }
    }
  }
`

const StyledHeader = styled.h1`
  font-size: 32px;
  margin: 0 0 40px;
  height: 50px;
`

const BlogPosts: React.FC<BlogPostsProps> = ({ posts }) => {
  return (
    <StyledContainer>
      <StyledHeader>Blog Posts</StyledHeader>
      <ol>
        {posts.map(post => {
          return (
            <li key={post.fields.slug}>
              <Post post={post} />
            </li>
          )
        })}
      </ol>
    </StyledContainer>
  )
}

export { BlogPosts }
