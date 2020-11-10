// custom typefaces
import "typeface-montserrat"
import "typeface-merriweather"
// normalize CSS across browsers
import "./src/styles/normalize.css"
// custom CSS styles
// import "./src/styles/style.css"

// Highlighting for code blocks
import "prismjs/themes/prism.css"
import "prismjs/plugins/command-line/prism-command-line.css"
// global context
import React from "react"
import { GlobalContextProvider } from "./src/context/global-context-provider"

export const wrapRootElement = ({ element }) => {
  return <GlobalContextProvider>{element}</GlobalContextProvider>
}
