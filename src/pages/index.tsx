import React, { useState, useEffect, useContext } from "react"
import styled from "styled-components"
import { graphql } from "gatsby"
import { WindowLocation } from "@reach/router"
import { Layout, SEO, Bio } from "@components"
import { BlogPosts, Category } from "@components/blog"
import { mixin } from "@styles"
import { GlobalStateContext } from "@context"

const StyledContainer = styled.div`
  ${mixin.container}
  max-width: 1400px;
  position: relative;
`

interface BlogPageProps {
  readonly location: WindowLocation | undefined
  data: {
    allMarkdownRemark: {
      nodes: {
        excerpt: string
        timeToRead: string
        frontmatter: {
          title: string
          date: string
          description: string
          category: string
          slug: string
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

const StyledWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
`

const IndexPage: React.FC<BlogPageProps> = ({ data, location }) => {
  const { category } = useContext(GlobalStateContext)
  const categories = data.categories.group
  const [posts, setPosts] = useState<any[]>(data.allMarkdownRemark.nodes)

  useEffect(() => {
    if (!category) return setPosts(data.allMarkdownRemark.nodes)
    const allPosts = data.allMarkdownRemark.nodes
    var filteredPosts: any[] = []
    allPosts.forEach(post => {
      if (post.frontmatter.category === category) {
        filteredPosts.push(post)
      }
    })
    setPosts(filteredPosts)
  }, [category])

  return (
    <Layout location={location}>
      <SEO title="David Park | Student at South Korea" />
      <StyledContainer>
        <Bio />
        {posts && categories && (
          <StyledWrapper>
            <Category categories={categories} />
            <BlogPosts posts={posts} />
          </StyledWrapper>
        )}
      </StyledContainer>
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        timeToRead
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
          category
          slug
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
