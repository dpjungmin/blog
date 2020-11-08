import React from "react"
import styled from "styled-components"
import { WindowLocation } from "@reach/router"
import { Bio, Layout, SEO } from "@components"
import { mixin } from "@styles"

interface IndexPageProps {
  readonly location: WindowLocation | undefined
}

const StyledContainer = styled.div`
  ${mixin.flexCenter}
`

const IndexPage: React.FC<IndexPageProps> = ({ location }) => {
  return (
    <Layout location={location}>
      <SEO title="David Park | Student at South Korea" />
      <StyledContainer>
        <Bio />
      </StyledContainer>
    </Layout>
  )
}

export default IndexPage
