import React from "react"
import { WindowLocation } from "@reach/router"
import styled from "styled-components"
import { Link } from "gatsby"
import { Layout, SEO } from "@components"
import { mixin } from "@styles"

interface NotFoundPageProps {
  readonly location: WindowLocation | undefined
}

const StyledContainer = styled.div`
  ${mixin.flexCenter}
  flex-direction: column;
`

const StyledHomeLink = styled(Link)`
  margin-top: 20px;
  height: 50px;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.5);
  background-color: #626ee3;
  border-radius: 4px;
  padding: 0 40px;
  color: #fff;
  transition: background-color 0.2s, padding 0.4s, box-shadow 0.2s, border 0.2s;
  position: relative;
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  border: none;
  &:hover {
    background-color: #535dc5;
  }
`

const NotFoundPage: React.FC<NotFoundPageProps> = ({ location }) => {
  return (
    <Layout location={location}>
      <SEO title="404: Not Found" />
      <StyledContainer>
        <h1>404: Not Found</h1>
        <p>You just hit a route that doesn&#39;t exist...</p>
        <StyledHomeLink to="/">Go back home</StyledHomeLink>
      </StyledContainer>
    </Layout>
  )
}

export default NotFoundPage
