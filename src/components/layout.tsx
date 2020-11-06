import React from "react"
import { WindowLocation } from "@reach/router"
import { GlobalStyles } from "@styles"

interface LayoutProps {
  readonly location: WindowLocation | undefined
}

const Layout: React.FC<LayoutProps> = ({ location, children }) => {
  const rootPath = "/"
  const isRootPath = location?.pathname === rootPath

  return (
    <div id="root" data-is-root-path={isRootPath}>
      <GlobalStyles />
      <main id="content">{children}</main>
    </div>
  )
}

export { Layout }
