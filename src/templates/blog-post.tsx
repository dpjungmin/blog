import React from "react"
import styled, { css } from "styled-components"
import { WindowLocation } from "@reach/router"
import { graphql } from "gatsby"
import { Layout, SEO } from "@components"
import { mixin, theme, media } from "@styles"
import {
  PostHeader,
  PostNav,
  IndexButton,
  StyledPost,
  TOC,
} from "@components/post"

const { mapCategoryToColor, fontSize } = theme

const StyledContainer = styled.div`
  ${mixin.container}
  max-width: 1000px;
  ${media.giant`max-width: 900px;`};
  @media (max-width: 1550px) {
    max-width: 800px;
  }
  @media (max-width: 1350px) {
    max-width: 1000px;
  }
  ${media.desktop`max-width: 760px;`}
  ${media.tablet`width: 100%;`}
`

const StyledWrapper = styled.div<{ category: string }>`
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(50, 50, 93, 0.1);
  border-radius: 4px;
  margin: 20px 0 0;
  min-width: 0;
  position: relative;
`

const StyledArticle = styled.article`
  padding: 30px 60px;
  ${media.tablet`
    padding-left: 12px;
    padding-right: 12px;
  `}
`

interface BlogPostTemplate {
  readonly location: WindowLocation | undefined
  data: {
    markdownRemark: {
      id: string
      excerpt: string
      timeToRead: number
      html: string
      tableOfContents: string
      frontmatter: {
        title: string
        date: string
        description: string
        category: string
        tags: string[]
      }
    }
    previous: {
      frontmatter: {
        title: string
        slug: string
      }
    }
    next: {
      frontmatter: {
        title: string
        slug: string
      }
    }
  }
}

const BlogPostTemplate: React.FC<BlogPostTemplate> = ({ data, location }) => {
  const post = data.markdownRemark
  const { id, excerpt, timeToRead, html, tableOfContents, frontmatter } = post
  const { title, date, description, category, tags } = frontmatter
  const { previous, next } = data

  return (
    <Layout location={location}>
      <SEO title={title} description={description || excerpt} />
      <StyledContainer className="fillSide">
        <IndexButton category={category} />
        <StyledWrapper category={category}>
          <PostHeader
            category={category}
            date={date}
            timeToRead={timeToRead}
            title={title}
            tags={tags}
          />
          <TOC toc={tableOfContents} />
          <StyledArticle itemScope itemType="http://schema.org/Article">
            <StyledPost
              dangerouslySetInnerHTML={{ __html: html }}
              itemProp="articleBody"
              className="post-content"
              category={category}
            />
          </StyledArticle>
        </StyledWrapper>
        <PostNav previous={previous} next={next} category={category} />
      </StyledContainer>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      timeToRead
      html
      tableOfContents(absolute: false, maxDepth: 4)
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        category
        tags
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      frontmatter {
        title
        slug
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      frontmatter {
        title
        slug
      }
    }
  }
`
