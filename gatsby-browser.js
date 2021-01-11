// custom typefaces
import "typeface-montserrat"
import "fontsource-open-sans"

// normalize CSS across browsers
import "./src/styles/normalize.css"

// Highlighting for code blocks
import "prismjs/themes/prism.css"
import "prismjs/plugins/command-line/prism-command-line.css"

// Custom styles
import "./src/styles/prism/token.scss"
import "./src/styles/prism/custom-code-buttons.scss"

// Ketex
import "katex/dist/katex.min.css"

// global context
import React from "react"
import { GlobalContextProvider } from "./src/context/global-context-provider"

export const wrapRootElement = ({ element }) => {
  return <GlobalContextProvider>{element}</GlobalContextProvider>
}
