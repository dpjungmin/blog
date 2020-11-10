import React, { useState, useEffect, useContext } from "react"
import styled from "styled-components"
import { graphql, Link } from "gatsby"
import { WindowLocation } from "@reach/router"
import { Layout, SEO } from "@components"
import { BlogPosts, Category } from "@components/blog"
import { theme, mixin, media } from "@styles"
import { GlobalStateContext } from "@context"

const { fontSize } = theme

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

const StyledBackButton = styled(Link)`
  position: fixed;
  top: 0;
  left: 10%;
  ${mixin.flexCenter}
  background-color: #02203c;
  color: white;
  font-size: ${fontSize.lg};
  border-radius: 0 0 4px 4px;
  padding: 10px 20px;
  box-shadow: 2px 2px 5px 0 rgba(0, 0, 0, 0.4);
  svg {
    width: 24px;
    margin-right: 4px;
  }
  ${media.phablet`left: 70%;`};
`

const StyledWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
`

const BlogPage: React.FC<BlogPageProps> = ({ data, location }) => {
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
      <SEO title="All posts" />
      <StyledContainer>
        <StyledBackButton to="/">Back</StyledBackButton>
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
