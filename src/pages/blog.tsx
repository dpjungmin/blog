import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { graphql } from "gatsby"
import { WindowLocation } from "@reach/router"
import { Layout, SEO } from "@components"
import { BlogPosts, Category } from "@components/blog"
import { mixin, media } from "@styles"

interface BlogPageProps {
  readonly location: WindowLocation | undefined
  data: {
    allMarkdownRemark: {
      nodes: {
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
    categories: {
      group: {
        fieldValue: string
        totalCount: number
      }[]
    }
  }
}

const StyledContainer = styled.div`
  ${mixin.container}
  max-width: 1400px;
  position: relative;
`

const StyledWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
`

const BlogPage: React.FC<BlogPageProps> = ({ data, location }) => {
  const [selected, setSelected] = useState<string | undefined>(undefined)
  const [posts, setPosts] = useState<any[]>(data.allMarkdownRemark.nodes)
  const categories = data.categories.group

  useEffect(() => {
    if (!selected) return setPosts(data.allMarkdownRemark.nodes)
    const allPosts = data.allMarkdownRemark.nodes
    var filteredPosts: any[] = []
    allPosts.forEach(post => {
      if (post.frontmatter.category === selected) {
        filteredPosts.push(post)
      }
    })
    setPosts(filteredPosts)
  }, [selected])

  return (
    <Layout location={location}>
      <SEO title="All posts" />
      <StyledContainer>
        {posts && categories && (
          <StyledWrapper>
            <Category
              selected={selected}
              setSelected={setSelected}
              categories={categories}
            />
            <BlogPosts posts={posts} />
          </StyledWrapper>
        )}
      </StyledContainer>
    </Layout>
  )
}

export default BlogPage

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        timeToRead
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
          category
        }
      }
    }
    categories: allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___category) {
        fieldValue
        totalCount
      }
    }
  }
`
